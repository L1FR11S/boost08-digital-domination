import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/blogUtils";
import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type LeadType = 'blog' | 'contact' | 'roi_calculator' | 'free_trial' | 'exit_intent' | 'all';

interface UnifiedLead {
  id: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  created_at: string;
  lead_type: Exclude<LeadType, 'all'>;
  source_details?: string;
  additional_data?: Record<string, any>;
}

const leadTypeConfig = {
  blog: { label: 'Blog', icon: '📚', color: 'bg-blue-500' },
  contact: { label: 'Kontakt', icon: '📞', color: 'bg-green-500' },
  roi_calculator: { label: 'ROI Kalkylator', icon: '💰', color: 'bg-purple-500' },
  free_trial: { label: 'Gratis Provperiod', icon: '🎁', color: 'bg-orange-500' },
  exit_intent: { label: 'Exit Intent', icon: '🚪', color: 'bg-red-500' },
};

const AdminLeads = () => {
  const [selectedType, setSelectedType] = useState<LeadType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const { data: allLeads, isLoading } = useQuery({
    queryKey: ["admin-all-leads"],
    queryFn: async () => {
      const [blogLeads, contactLeads, roiLeads, trialLeads, exitLeads] = await Promise.all([
        supabase.from('blog_leads').select('*, blog_posts(title)').order('created_at', { ascending: false }),
        supabase.from('contact_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('roi_calculator_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('free_trial_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('exit_intent_leads').select('*').order('created_at', { ascending: false }),
      ]);

      const unified: UnifiedLead[] = [
        ...(blogLeads.data || []).map(l => ({
          id: l.id,
          email: l.email,
          name: l.name,
          company: l.company,
          created_at: l.created_at,
          lead_type: 'blog' as const,
          source_details: l.blog_posts?.title,
          additional_data: { lead_type: l.lead_type }
        })),
        ...(contactLeads.data || []).map(l => ({
          id: l.id,
          email: l.email,
          name: l.name,
          company: l.company,
          created_at: l.created_at,
          lead_type: 'contact' as const,
          source_details: l.message,
          additional_data: {}
        })),
        ...(roiLeads.data || []).map(l => ({
          id: l.id,
          email: l.email,
          name: l.name,
          company: l.company,
          phone: l.phone,
          created_at: l.created_at,
          lead_type: 'roi_calculator' as const,
          additional_data: {
            industry: l.industry,
            locations: l.locations,
            reviews: l.reviews,
            revenue: l.revenue,
            estimated_increase: l.estimated_increase,
            new_customers: l.new_customers
          }
        })),
        ...(trialLeads.data || []).map(l => ({
          id: l.id,
          email: l.email,
          name: l.full_name,
          company: l.company_name,
          phone: l.phone,
          created_at: l.created_at,
          lead_type: 'free_trial' as const,
          additional_data: {
            industry: l.industry,
            locations: l.locations
          }
        })),
        ...(exitLeads.data || []).map(l => ({
          id: l.id,
          email: l.email,
          created_at: l.created_at,
          lead_type: 'exit_intent' as const,
          additional_data: {}
        })),
      ];

      return unified.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
  });

  const filteredLeads = useMemo(() => {
    if (!allLeads) return [];
    
    let filtered = allLeads;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(lead => lead.lead_type === selectedType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.email.toLowerCase().includes(query) ||
        lead.name?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [allLeads, selectedType, searchQuery]);

  const stats = useMemo(() => {
    if (!allLeads) return null;
    
    const counts = {
      total: allLeads.length,
      blog: allLeads.filter(l => l.lead_type === 'blog').length,
      contact: allLeads.filter(l => l.lead_type === 'contact').length,
      roi_calculator: allLeads.filter(l => l.lead_type === 'roi_calculator').length,
      free_trial: allLeads.filter(l => l.lead_type === 'free_trial').length,
      exit_intent: allLeads.filter(l => l.lead_type === 'exit_intent').length,
    };
    
    const last7Days = allLeads.filter(l => {
      const date = new Date(l.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo;
    }).length;
    
    return { ...counts, last7Days };
  }, [allLeads]);

  const toggleExpand = (leadId: string) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Laddar leads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Leads</h2>
        <p className="text-muted-foreground">Alla leads från hemsidan</p>
      </div>

      {stats && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Statistik</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground mt-1">Totalt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.blog}</div>
              <div className="text-xs text-muted-foreground mt-1">Blog</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.contact}</div>
              <div className="text-xs text-muted-foreground mt-1">Kontakt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.roi_calculator}</div>
              <div className="text-xs text-muted-foreground mt-1">ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.free_trial}</div>
              <div className="text-xs text-muted-foreground mt-1">Trial</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.exit_intent}</div>
              <div className="text-xs text-muted-foreground mt-1">Exit</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{stats.last7Days}</span> nya leads senaste 7 dagarna
            </p>
          </div>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök på email, namn eller företag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            Alla
          </Button>
          {Object.entries(leadTypeConfig).map(([type, config]) => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type as LeadType)}
            >
              {config.icon} {config.label}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4 pr-4">
          {filteredLeads.map((lead) => {
            const config = leadTypeConfig[lead.lead_type];
            const isExpanded = expandedLead === lead.id;
            
            return (
              <Card key={lead.id} className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${config.color} text-white border-0`}>
                          {config.icon} {config.label}
                        </Badge>
                        <span className="font-semibold">{lead.email}</span>
                      </div>
                      
                      {lead.name && (
                        <p className="text-sm text-muted-foreground">Namn: {lead.name}</p>
                      )}
                      {lead.company && (
                        <p className="text-sm text-muted-foreground">Företag: {lead.company}</p>
                      )}
                      {lead.phone && (
                        <p className="text-sm text-muted-foreground">Telefon: {lead.phone}</p>
                      )}
                      
                      {lead.source_details && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {lead.lead_type === 'blog' && `Från: ${lead.source_details}`}
                          {lead.lead_type === 'contact' && (
                            <>Meddelande: {lead.source_details.substring(0, 100)}{lead.source_details.length > 100 ? '...' : ''}</>
                          )}
                        </p>
                      )}
                      
                      <div className="text-xs text-muted-foreground mt-2">
                        📅 {formatDate(lead.created_at)}
                      </div>
                    </div>
                    
                    {Object.keys(lead.additional_data || {}).length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(lead.id)}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  
                  {isExpanded && lead.additional_data && (
                    <div className="pt-3 border-t space-y-1">
                      <h4 className="text-sm font-semibold mb-2">Ytterligare information:</h4>
                      {Object.entries(lead.additional_data).map(([key, value]) => (
                        <p key={key} className="text-sm text-muted-foreground">
                          <span className="capitalize">{key.replace(/_/g, ' ')}</span>: {String(value)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}

          {filteredLeads.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery || selectedType !== 'all' 
                  ? 'Inga leads matchar din sökning'
                  : 'Inga leads ännu'}
              </p>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminLeads;
