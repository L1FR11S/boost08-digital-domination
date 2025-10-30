import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, FolderOpen, Users, LogOut, Calendar, FormInput } from "lucide-react";

/**
 * Admin Layout Component
 * 
 * SECURITY NOTE: The client-side authentication check below is for UX only.
 * Real security is enforced through Row-Level Security (RLS) policies in the database.
 * Even if a user bypasses this redirect, all database operations are protected by RLS
 * which verifies the user has the 'admin' role via the has_role() function.
 * 
 * This layered approach provides:
 * - Client-side: Good UX by redirecting non-admins immediately
 * - Server-side: Actual security through RLS policies on all tables
 */
const AdminLayout = () => {
  const { isAdmin, loading } = useAdmin();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laddar...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/posts", icon: FileText, label: "Inlägg" },
    { to: "/admin/categories", icon: FolderOpen, label: "Kategorier" },
    { to: "/admin/content-schedule", icon: Calendar, label: "Content Automation" },
    { to: "/admin/leads", icon: Users, label: "Leads" },
    { to: "/admin/forms", icon: FormInput, label: "Formulär" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Boost08 Admin</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
