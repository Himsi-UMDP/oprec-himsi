import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export function useAdminAuth() {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    // Cek session saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setState("unauthenticated");
        navigate("/admin/login");
        return;
      }

      // Verifikasi apakah ada di tabel admins
      supabase
        .from("admins")
        .select("email")
        .eq("email", session.user.email ?? "")
        .single()
        .then(({ data }) => {
          if (!data) {
            supabase.auth.signOut();
            setState("unauthenticated");
            navigate("/admin/login");
          } else {
            setState("authenticated");
          }
        });
    });

    // Subscribe perubahan auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setState("unauthenticated");
          navigate("/admin/login");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  return { isLoading: state === "loading", isAuthenticated: state === "authenticated" };
}