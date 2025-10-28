import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Trash2, RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/utils/blogUtils";

export default function AdminContentSchedule() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    scheduled_date: "",
    scheduled_time: "09:00",
    topic: "",
    keywords: "",
    target_audience: "",
    content_type: "guide",
    target_word_count: 1500,
    primary_keyword: "",
    auto_publish: true,
  });

  // Fetch schedules
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["content-schedules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_schedule")
        .select("*, blog_posts(title, slug)")
        .order("scheduled_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Create schedule mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("content_schedule").insert({
        ...data,
        keywords: data.keywords.split(",").map((k) => k.trim()),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-schedules"] });
      toast.success("Schema skapat!");
      setShowForm(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error("Fel: " + error.message);
    },
  });

  // Delete schedule mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("content_schedule").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-schedules"] });
      toast.success("Schema raderat!");
    },
  });

  // Manual trigger mutation
  const triggerMutation = useMutation({
    mutationFn: async (schedule: any) => {
      const { error } = await supabase.functions.invoke("generate-blog-post", {
        body: {
          scheduleId: schedule.id,
          topic: schedule.topic,
          keywords: schedule.keywords,
          targetAudience: schedule.target_audience,
          contentType: schedule.content_type,
          targetWordCount: schedule.target_word_count,
          primaryKeyword: schedule.primary_keyword,
          autoPublish: schedule.auto_publish,
        },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-schedules"] });
      toast.success("Generering startad!");
    },
    onError: (error: any) => {
      toast.error("Fel: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      scheduled_date: "",
      scheduled_time: "09:00",
      topic: "",
      keywords: "",
      target_audience: "",
      content_type: "guide",
      target_word_count: 1500,
      primary_keyword: "",
      auto_publish: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.scheduled_date || !formData.topic || !formData.keywords) {
      toast.error("Fyll i alla obligatoriska fält");
      return;
    }
    createMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string; icon: any }> = {
      pending: { label: "Väntande", className: "bg-blue-500", icon: Clock },
      generating: { label: "Genererar", className: "bg-yellow-500", icon: Loader2 },
      generated: { label: "Genererad", className: "bg-green-500", icon: CheckCircle },
      published: { label: "Publicerad", className: "bg-green-600", icon: CheckCircle },
      failed: { label: "Misslyckades", className: "bg-red-500", icon: XCircle },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Laddar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Automation</h1>
          <p className="text-muted-foreground">Schemalägg AI-genererade blogginlägg</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nytt Schema
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Skapa Nytt Schema</CardTitle>
            <CardDescription>AI kommer generera innehållet automatiskt på valt datum</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled_date">Datum *</Label>
                  <Input
                    id="scheduled_date"
                    type="date"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="scheduled_time">Tid</Label>
                  <Input
                    id="scheduled_time"
                    type="time"
                    value={formData.scheduled_time}
                    onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="topic">Ämne / Titel *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="t.ex. Lokal SEO för kliniker 2025"
                  required
                />
              </div>

              <div>
                <Label htmlFor="keywords">Sökord (kommaseparerade) *</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="lokal SEO, kliniker, Google Maps"
                  required
                />
              </div>

              <div>
                <Label htmlFor="primary_keyword">Huvudsökord</Label>
                <Input
                  id="primary_keyword"
                  value={formData.primary_keyword}
                  onChange={(e) => setFormData({ ...formData, primary_keyword: e.target.value })}
                  placeholder="Lämna tomt för att använda första sökordet"
                />
              </div>

              <div>
                <Label htmlFor="target_audience">Målgrupp</Label>
                <Input
                  id="target_audience"
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  placeholder="t.ex. Vårdkliniker i storstäder"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content_type">Innehållstyp</Label>
                  <Select value={formData.content_type} onValueChange={(value) => setFormData({ ...formData, content_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="listicle">Lista</SelectItem>
                      <SelectItem value="how_to">How-to</SelectItem>
                      <SelectItem value="case_study">Case Study</SelectItem>
                      <SelectItem value="news">Nyhet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target_word_count">Målord</Label>
                  <Input
                    id="target_word_count"
                    type="number"
                    value={formData.target_word_count}
                    onChange={(e) => setFormData({ ...formData, target_word_count: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto_publish" checked={formData.auto_publish} onCheckedChange={(checked) => setFormData({ ...formData, auto_publish: checked })} />
                <Label htmlFor="auto_publish">Auto-publicera (annars sparas som utkast)</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Skapar..." : "Skapa Schema"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {schedules?.map((schedule) => (
          <Card key={schedule.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{schedule.topic}</h3>
                    {getStatusBadge(schedule.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {schedule.scheduled_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {schedule.scheduled_time}
                    </span>
                    <Badge variant="outline">{schedule.content_type}</Badge>
                    {schedule.auto_publish && <Badge variant="secondary">Auto-publicera</Badge>}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sökord:</span> {schedule.keywords.join(", ")}
                  </div>
                  {schedule.blog_posts && (
                    <div className="text-sm text-green-600">
                      ✓ Genererat inlägg:{" "}
                      <a href={`/blogg/${schedule.blog_posts.slug}`} className="underline">
                        {schedule.blog_posts.title}
                      </a>
                    </div>
                  )}
                  {schedule.error_message && <div className="text-sm text-red-600">Fel: {schedule.error_message}</div>}
                </div>
                <div className="flex gap-2">
                  {schedule.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => triggerMutation.mutate(schedule)} disabled={triggerMutation.isPending}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Kör nu
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(schedule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {schedules?.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>Inga schemalagda inlägg ännu. Skapa ditt första schema!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}