import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

/**
 * Admin Authentication Hook
 * 
 * SECURITY ARCHITECTURE:
 * This hook checks if the current user has the 'admin' role for UI rendering purposes.
 * However, this is NOT the primary security mechanism. All data access is protected
 * by Row-Level Security (RLS) policies in Supabase that verify admin status server-side.
 * 
 * Security layers:
 * 1. Client-side (this hook): Provides good UX by hiding admin UI from non-admins
 * 2. Server-side (RLS policies): Enforces actual access control on all database operations
 * 
 * The user_roles table with has_role() security definer function prevents:
 * - Privilege escalation attacks
 * - Direct database manipulation
 * - Client-side bypass attempts
 * 
 * Even if this check is bypassed, RLS policies will reject unauthorized operations.
 */
export const useAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        if (currentUser) {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .eq('role', 'admin')
            .single();

          setIsAdmin(!!roles);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isAdmin, loading };
};
