import type { 
    Hero, 
    LogoConfig, 
    NavItem,
    Division,
    Proker,
    Timeline,
    Faq, 
} from "@/constans/type";
import { 
    Code, 
    Megaphone, 
    Users, 
    Camera 
} from "lucide-react";
import type { PendaftaranRow } from "@/lib/supabase";


import it1 from "@/assets/divisi/logo-litbang.png";
import humas1 from "@/assets/divisi/logo-sosial.png";
import sdm1 from "@/assets/divisi/logo-psdm.jpeg";
import dokumentasi1 from "@/assets/divisi/logo-kominfo.jpeg";
import ksi from "@/assets/proker/ksi.jpg";
import trikologi from "@/assets/proker/trikologi.png";
import pkkmb from "@/assets/proker/pkkmb.png";


export const SCROLL_THRESHOLD = 50;

export const navlink: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Pengumuman", href: "#oprec" },
    { name: "Bidang", href: "#bidang" },
];

export const logoConfig: LogoConfig = {
    src: "/logo.png",
    alt: "Logo HIMSI",
    width: 42,
    height: 42,
    label: "HIMSI",
};

export const hero: Hero = {
    badge: "Open Recruitment HIMSI UMDP 2026",
    headingMain: "Wujudkan Peranmu",
    headingAccent: "di HIMSI UMDP",
    description:
        "Himpunan Mahasiswa Sistem Informasi UMDP membuka kesempatan bagi kamu yang ingin berkontribusi, berkembang, dan menciptakan dampak nyata di kampus. Pendaftaran dibuka, Jangan lewatkan!",
    primaryCTA: {
        label: "Daftar Sekarang",
        href: "#oprec",
    },
    secondaryCTA: {
        label: "Guide Book",
        href: "https://drive.google.com/drive/folders/1RD7Dgv-YCoNhrEy7L6HaAweZn__ZU1lL",
    },
};

export const divisions: Division[] = [
    {
        id: "psdm",
        icon: Users,
        name: "PSDM",
        desc: "Bidang Pengembangan Sumber Daya Mahasiswa yang berfokus pada kaderisasi, peningkatan kualitas anggota, serta penguatan budaya kerja dan koordinasi organisasi.",
        images: [sdm1],
        divisi: [
            { title: "Internal", desc: "Mengelola pembinaan anggota, kaderisasi, evaluasi, dan penguatan sistem kerja internal." },
            { title: "Eksternal", desc: "Membangun relasi dan kolaborasi untuk mendukung pengembangan anggota melalui jejaring dan kegiatan eksternal." },
        ],
    },
        {
        id: "sosial",
        icon: Megaphone,
        name: "Sosial",
        desc: "Bidang yang mengarahkan HIMSI pada aksi sosial, kepedulian, dan kontribusi nyata, sekaligus menguatkan kemandirian organisasi melalui dana usaha dan kemitraan sosial.",
        images: [humas1],
        divisi: [
            { title: "Sosial Kemasyarakatan", desc: "Menjalankan program pengabdian, kepedulian, dan kegiatan sosial yang berdampak bagi kampus maupun masyarakat." },
            { title: "Dana Usaha", desc: "Mengelola strategi fundraising dan usaha organisasi untuk mendukung kebutuhan program dan operasional." },
            { title: "Kolaborasi & Kemitraan Sosial", desc: "Menjalin kerja sama dengan komunitas/mitra untuk memperluas dampak program sosial dan dukungan sumber daya." },
        ],
    },
        {
        id: "litbang",
        icon: Code,
        name: "LITBANG IT",
        desc: "Bidang riset dan pengembangan teknologi yang mendorong inovasi, penguatan kompetensi digital, serta pembuatan solusi berbasis IT untuk kebutuhan organisasi dan anggota.",
        images: [it1],
        divisi: [
            { title: "Desain Interaktif & Rekayasa Web Aplikasi", desc: "Membangun dan mengelola website/aplikasi sebagai solusi sistem dan layanan digital organisasi.." },
            { title: "Pemberdayaan & Perkembangan Teknologi", desc: "Mengadakan riset, kajian, dan edukasi teknologi untuk meningkatkan literasi serta skill anggota." },
        ],
    },
        {
        id: "kominfo",
        icon: Camera,
        name: "Kominfo",
        desc: "Bidang komunikasi dan informasi yang memastikan pesan HIMSI tersampaikan dengan rapi, kreatif, dan konsisten melalui publikasi, konten visual, serta dokumentasi kegiatan.",
        images: [dokumentasi1],
        divisi: [
            { title: "Publikasi", desc: "Mengelola penyampaian informasi resmi seperti pengumuman, agenda, dan kampanye komunikasi HIMSI." },
            { title: "Kreatif", desc: "Mendesain konten visual dan branding agar identitas HIMSI kuat dan menarik di berbagai media." },
            { title: "Dokumentasi", desc: "Mendokumentasikan kegiatan dalam bentuk foto/video sebagai arsip dan bahan publikasi organisasi." },
        ],
    },
];


export const prokers: Proker[] = [
    {
        id: "ksi",
        images: [ksi],
        title: "Kampung Sistem Informasi (KSI)",
        desc: "Meningkatan solidaritas dan kebersamaan antar mahasiswa Sistem Informasi.",
    },
    {
        id: "trikologi",
        images: [trikologi],
        title: "TRIKOLOGI",
        desc: "Tips and Trik seputar Pemrograman dan Teknologi untuk meningkatkan kompetensi anggota.",
    },
    {
        id: "pkkmb-himsi",
        images: [pkkmb],
        title: "PKKMB HIMSI",
        desc: "Memperkenalkan kehidupan kampus kepada mahasiswa baru terutama Mahasiswa Prodi Sistem Informasi.",
    },
];

export const timeline: Timeline[] = [
    {
        id: "Pendaftaran Online",
        date: "04 - 12 Maret 2026",
        title: "Pembukaan Pendaftaran",
        desc: "Isi formulir pendaftaran onlinedan upload berkas yang diperlukan.",
    },
    {
        id: "wawancara",
        date: "14 Maret 2026",
        title: "Wawancara",
        desc: "Sesi interview untuk mengenal lebih jauh tentang dirimu.",
    },
    {
        id: "pengumuman",
        date: "16 Maret 2026",
        title: "Pengumuman",
        desc: "Hasil seleksi akhir diumumkan melalui website dan media sosial.",
    },
    {
        id: "onboarding",
        date: "04 April 2026",
        title: "Latihan Dasar Organisasi (LDO)",
        desc: "Orientasi dan Pengenalan Oraganisasi untuk calon anggota baru.",
    },
];

export const faqs: Faq[] = [
    {
        id: "siapa-bisa-daftar",
        q: "Siapa saja yang bisa mendaftar oprec HIMSI?",
        a: "Seluruh mahasiswa aktif Program Studi Sistem Informasi dengan minimal semester 2 dan maksimal semester 4 dapat mendaftar.",
    },
    {
        id: "pengalaman-organisasi",
        q: "Apakah harus punya pengalaman organisasi sebelumnya?",
        a: "Tidak harus. HIMSI terbuka untuk semua mahasiswa, baik yang sudah berpengalaman maupun yang ingin belajar dari nol.",
    },
    {
        id: "syarat-oprec",
        q: "Apa saja syarat mengikuti oprec?",
        a: [
            "Mahasiswa aktif (min sem 2, maks sem 4),",
            "Pernah mengikuti KSI,",
            "Membuat CV semenarik mungkin,",
            "Memiliki sertifikat/dokumen pendukung sesuai bidang (jika ada),",
            "Bertanggung jawab, disiplin, dan memiliki komitmen tinggi,",
            "Menuliskan deskripsi diri minimal 50 kata,",
        ].join("\n"),
    },
    {
        id: "berkas-pendaftaran",
        q: "Apa saja berkas yang perlu disiapkan untuk mendaftar?",
        a: [
            "Deskripsi diri minimal 50 kata,",
            "CV,",
            "Sertifikat KSI,",
            "Sertifikat/dokumen pendukung (jika ada),",
        ].join("\n"),
    },
    {
        id: "keuntungan-himsi",
        q: "Apa keuntungan bergabung di HIMSI?",
        a: [
            "Golden Networking,",
            "Leadership & Organizational Experience,",
            "Sertifikat & Poin Aktivitas,",
            "Tambahan Nilai CV & Portofolio,",
            "Kesempatan Mengembangkan Kompetensi Akademik & Non-Akademik,",
        ].join("\n"),
    },
    {
        id: "ganggu-kuliah",
        q: "Apakah kegiatan HIMSI mengganggu perkuliahan?",
        a: "Tidak. Kegiatan disesuaikan dengan jadwal kuliah dan tetap mengutamakan akademik. Manajemen waktu menjadi salah satu skill yang akan kamu pelajari di organisasi.",
    },
    {
        id: "info-pengumuman",
        q: "Informasi dan pengumuman seleksi dikirim melalui apa?",
        a: "Seluruh informasi akan dikirim melalui Whatsapp Grup, sementara pengumuman akan dilakukan melalui email mhs yang terdaftar.",
    },
    {
        id: "daftar-lagi",
        q: "Jika tidak lolos, apakah bisa mendaftar lagi?",
        a: "Tentu saja bisa. Biasanya oprec dibuka setiap periode kepengurusan.",
    },
];


export const BIDANG_CONFIG = [
    { name: "PSDM",    color: "text-blue-600",   bg: "bg-blue-100",   iconBg: "bg-blue-500",   emoji: "👥" },
    { name: "Sosial",  color: "text-orange-600", bg: "bg-orange-100", iconBg: "bg-orange-500", emoji: "🤝" },
    { name: "Kominfo", color: "text-teal-600",   bg: "bg-teal-100",   iconBg: "bg-teal-500",   emoji: "📢" },
    { name: "Litbang", color: "text-purple-600", bg: "bg-purple-100", iconBg: "bg-purple-500", emoji: "💻" },
] as const;

export const STATUS_CONFIG: Record<PendaftaranRow["status"], { label: string; className: string }> = {
    pending:  { label: "Pending",  className: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
    diterima: { label: "Diterima", className: "bg-green-100 text-green-700 border border-green-200"   },
    selesai:  { label: "Selesai",  className: "bg-blue-100 text-blue-700 border border-blue-200"         },
};

export const STAT_CARD_CONFIG = [
    { key: "total"    as const, label: "Pendaftar Total",    iconBg: "bg-blue-100",   iconColor: "text-blue-500",   emoji: "👥" },
    { key: "diterima" as const, label: "Pendaftar Diterima", iconBg: "bg-green-100",  iconColor: "text-green-500",  emoji: "✅" },
    { key: "pending"  as const, label: "Menunggu Review",    iconBg: "bg-yellow-100", iconColor: "text-yellow-500", emoji: "⏳" },
    { key: "selesai"  as const, label: "Selesai Wawancara",  iconBg: "bg-blue-100",   iconColor: "text-blue-500",   emoji: "🔷" },
];

export const TABLE_HEADERS = ["No","Nama","NPM","Angkatan","Bidang 1","Bidang 2","Alasan","Status","CV","Aksi"];