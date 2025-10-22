import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/blogUtils";

const AdminLeads = () => {
  const { data: leads } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_leads")
        .select(`
          *,
          blog_posts (title)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Leads</h2>
        <p className="text-muted-foreground">Alla leads från bloggen</p>
      </div>

      <div className="space-y-4">
        {leads?.map((lead) => (
          <Card key={lead.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{lead.email}</span>
                  {lead.lead_type && (
                    <Badge variant="secondary">{lead.lead_type}</Badge>
                  )}
                </div>
                {lead.name && (
                  <p className="text-sm text-muted-foreground">Namn: {lead.name}</p>
                )}
                {lead.company && (
                  <p className="text-sm text-muted-foreground">Företag: {lead.company}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span>Registrerad: {formatDate(lead.created_at)}</span>
                  {lead.blog_posts && (
                    <span>Från: {lead.blog_posts.title}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {leads?.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Inga leads ännu</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
