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
    { name: "Pengumuman", href: "#pengumuman" },
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
        href: "/daftar",
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
        date: "03 - 12 Maret 2026",
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
        date: "15 Maret 2026",
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
        id: "siapa-boleh-daftar",
        q: "Siapa saja yang boleh mendaftar Open Recruitment HIMSI?",
        a: "Mahasiswa aktif minimal semester 2 dan maksimal semester 4 diperbolehkan mendaftar. Pastikan siap mengikuti rangkaian seleksi sampai selesai.",
    },
    {
        id: "syarat-berkas",
        q: "Apa saja syarat dan berkas yang perlu disiapkan?",
        a: "Siapkan data diri sesuai form pendaftaran dan berkas pendukung yang diminta. Pastikan semua informasi diisi lengkap dan benar agar lolos tahap seleksi berkas.",
    },
    {
        id: "proses-seleksi",
        q: "Bagaimana proses seleksi Open Recruitment HIMSI?",
        a: "Proses seleksi terdiri dari 3 tahap: seleksi berkas, wawancara (sekalian pada tahap berikutnya), dan pengumuman akhir. Detail informasi tiap tahap akan dikirimkan melalui WAG.",
    },
    {
        id: "pengumuman-informasi",
        q: "Informasi dan pengumuman seleksi dikirim melalui apa?",
        a: "Seluruh informasi, jadwal, dan pengumuman akan disampaikan melalui WAG. Pastikan nomor yang kamu daftarkan aktif dan bisa dihubungi.",
    },
];