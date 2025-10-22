import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [postsRes, leadsRes, viewsRes] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact" }),
        supabase.from("blog_leads").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("views"),
      ]);

      const totalViews = viewsRes.data?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;

      return {
        totalPosts: postsRes.count || 0,
        totalLeads: leadsRes.count || 0,
        totalViews,
      };
    },
  });

  const statCards = [
    { title: "Totala Inlägg", value: stats?.totalPosts || 0, icon: FileText },
    { title: "Totala Leads", value: stats?.totalLeads || 0, icon: Users },
    { title: "Totala Visningar", value: stats?.totalViews || 0, icon: Eye },
    { title: "Konverteringsgrad", value: "N/A", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Översikt över din blogg</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
