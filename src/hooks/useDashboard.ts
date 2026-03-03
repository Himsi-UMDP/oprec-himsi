import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { PendaftaranRow } from "@/lib/supabase";
import { getAllPendaftar, updateStatus, getCVSignedUrl } from "@/services/pendaftaran";
import { BIDANG_CONFIG } from "@/constans";
import type { StatusFilter, BidangFilter, DashboardStats } from "@/constans/admin";

export function useDashboard() {
  const navigate = useNavigate();
  const [data, setData]               = useState<PendaftaranRow[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [bidangFilter, setBidangFilter] = useState<BidangFilter>("semua");
  const [updatingId, setUpdatingId]   = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // ─── Auth guard ──────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
    });
  }, [navigate]);

  // ─── Fetch data ───────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getAllPendaftar();
      setData(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Stats computation ────────────────────────────────────────────────────
  const stats = useMemo((): DashboardStats => ({
    total:    data.length,
    diterima: data.filter(d => d.status === "diterima").length,
    ditolak:  data.filter(d => d.status === "ditolak").length,
    pending:  data.filter(d => d.status === "pending").length,
    perBidang: BIDANG_CONFIG.map(b => ({
      name:   b.name,
      count:  data.filter(d => d.bidang1 === b.name || d.bidang2 === b.name).length,
      color:  b.color,
      bg:     b.bg,
      icon:   b.emoji,
    })),
  }), [data]);

  // ─── Filtered data ────────────────────────────────────────────────────────
  const filtered = useMemo(() =>
    data.filter(d => {
      const matchStatus = statusFilter === "semua" || d.status === statusFilter;
      const matchBidang = bidangFilter === "semua" || d.bidang1 === bidangFilter || d.bidang2 === bidangFilter;
      return matchStatus && matchBidang;
    }),
  [data, statusFilter, bidangFilter]);

  // ─── Actions ──────────────────────────────────────────────────────────────
  const handleStatusChange = useCallback(async (id: string, status: PendaftaranRow["status"]) => {
    setUpdatingId(id);
    try {
      await updateStatus(id, status);
      setData(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal update status.");
    } finally {
      setUpdatingId(null);
    }
  }, []);

  const handleDownloadCV = useCallback(async (row: PendaftaranRow) => {
    if (!row.cv_url) return alert("CV tidak tersedia.");
    setDownloadingId(row.id);
    try {
      const url = await getCVSignedUrl(row.cv_url);
      window.open(url, "_blank");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal mengunduh CV.");
    } finally {
      setDownloadingId(null);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }, [navigate]);

  return {
    data, loading, error, stats, filtered,
    statusFilter, setStatusFilter,
    bidangFilter, setBidangFilter,
    updatingId, downloadingId,
    handleStatusChange, handleDownloadCV,
    handleLogout, fetchData,
  };
}