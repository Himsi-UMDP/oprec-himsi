import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (authError) throw new Error("Email atau password salah.");

      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("email")
        .eq("email", authData.user?.email ?? "")
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        throw new Error("Akun ini tidak memiliki akses admin.");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-himsi-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2464a8] mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Admin{" "}
            <span className="text-[#2464a8]">HIMSI UMDP</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-semibold">
            Masuk untuk mengelola data pendaftar
          </p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Admin
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mhs.mdp.ac.id"
                disabled={loading}
                required
                autoComplete="email"
                className="flex h-11 w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#2464a8]/30 disabled:opacity-60 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  autoComplete="current-password"
                  className="flex h-11 w-full rounded-xl border border-black/10 bg-white/70 px-4 pr-11 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#2464a8]/30 disabled:opacity-60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-11 rounded-xl bg-[#2464a8] text-white text-sm font-bold hover:bg-[#2464a8]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs font-semibold text-muted-foreground mt-6">
          © 2026 HIMSI UMDP · Open Recruitment
        </p>
      </div>
    </div>
  );
}