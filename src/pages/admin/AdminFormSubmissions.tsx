import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminFormSubmissions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: form } = useQuery({
    queryKey: ["custom-form", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_forms")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["form-submissions", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .eq("form_id", id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const exportToCSV = () => {
    if (!submissions || submissions.length === 0) return;

    const headers = Object.keys(submissions[0].submission_data);
    const csvContent = [
      ['Datum', 'Email Skickad', 'Intern Email', ...headers].join(','),
      ...submissions.map(sub => [
        new Date(sub.created_at).toLocaleString('sv-SE'),
        sub.user_email_sent ? 'Ja' : 'Nej',
        sub.internal_email_sent ? 'Ja' : 'Nej',
        ...headers.map(h => JSON.stringify(sub.submission_data[h] || ''))
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form?.slug || 'form'}-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Laddar submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/forms")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground">
            Alla svar för {form?.name}
          </p>
        </div>
        {submissions && submissions.length > 0 && (
          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportera CSV
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions ({submissions?.length || 0})</CardTitle>
          <CardDescription>
            Alla formulär-submissions visas här
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submissions || submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Inga submissions ännu
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleString('sv-SE')}
                    </TableCell>
                    <TableCell>
                      {(submission.submission_data as any)?.email || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant={submission.user_email_sent ? "default" : "secondary"}>
                          {submission.user_email_sent ? "Email skickad" : "Ej skickad"}
                        </Badge>
                        <Badge variant={submission.internal_email_sent ? "default" : "secondary"}>
                          {submission.internal_email_sent ? "Notis skickad" : "Ej skickad"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Visa Data
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submission Data</DialogTitle>
                            <DialogDescription>
                              {new Date(submission.created_at).toLocaleString('sv-SE')}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2">
                            {Object.entries(submission.submission_data).map(([key, value]) => (
                              <div key={key} className="border-b pb-2">
                                <p className="text-sm font-medium">{key}</p>
                                <p className="text-sm text-muted-foreground">{String(value)}</p>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
