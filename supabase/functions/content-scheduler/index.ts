import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const today = new Date().toISOString().split('T')[0];
    console.log('Running content scheduler for date:', today);

    // Fetch all pending schedules for today
    const { data: schedules, error: fetchError } = await supabase
      .from('content_schedule')
      .select('*')
      .eq('scheduled_date', today)
      .eq('status', 'pending')
      .order('scheduled_time', { ascending: true });

    if (fetchError) {
      console.error('Error fetching schedules:', fetchError);
      throw fetchError;
    }

    if (!schedules || schedules.length === 0) {
      console.log('No schedules found for today');
      return new Response(
        JSON.stringify({ message: 'No schedules for today', date: today }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    console.log(`Found ${schedules.length} schedule(s) for today`);

    const results = [];

    // Process each schedule
    for (const schedule of schedules) {
      console.log(`Processing schedule ${schedule.id}: ${schedule.topic}`);

      try {
        // Call generate-blog-post function
        const { data, error } = await supabase.functions.invoke('generate-blog-post', {
          body: {
            scheduleId: schedule.id,
            topic: schedule.topic,
            keywords: schedule.keywords,
            targetAudience: schedule.target_audience,
            contentType: schedule.content_type,
            targetWordCount: schedule.target_word_count,
            primaryKeyword: schedule.primary_keyword,
            autoPublish: schedule.auto_publish
          }
        });

        if (error) {
          console.error(`Failed to generate post for schedule ${schedule.id}:`, error);
          results.push({
            scheduleId: schedule.id,
            topic: schedule.topic,
            success: false,
            error: error.message
          });

          // Update schedule with error
          await supabase
            .from('content_schedule')
            .update({
              status: 'failed',
              error_message: error.message,
              retry_count: schedule.retry_count + 1
            })
            .eq('id', schedule.id);
        } else {
          console.log(`Successfully generated post for schedule ${schedule.id}`);
          results.push({
            scheduleId: schedule.id,
            topic: schedule.topic,
            success: true,
            postId: data.postId,
            slug: data.slug
          });
        }
      } catch (error: any) {
        console.error(`Error processing schedule ${schedule.id}:`, error);
        results.push({
          scheduleId: schedule.id,
          topic: schedule.topic,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    console.log(`Scheduler complete: ${successCount} succeeded, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        date: today,
        processed: schedules.length,
        succeeded: successCount,
        failed: failCount,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in content-scheduler:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});