import type { 
    Hero, 
    LogoConfig, 
    NavItem 
} from "@/constans/type";
import { 
    Code, 
    Megaphone, 
    Users, 
    Camera 
} from "lucide-react";

import type { Division } from "@/constans/type";
import it1 from "@/assets/divisi/logo-litbang.png";
import humas1 from "@/assets/divisi/logo-sosial.png";
import sdm1 from "@/assets/divisi/logo-psdm.jpeg";
import dokumentasi1 from "@/assets/divisi/logo-kominfo.jpeg";


export const SCROLL_THRESHOLD = 50;

export const navlink: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "Pengumuman", href: "#pengumuman" },
    { name: "Kontak", href: "#kontak" },
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
        label: "Pelajari Lebih Lanjut",
        href: "#tentang",
    },
};

export const divisions: Division[] = [
    {
        id: "psdm",
        icon: Users,
        name: "PSDM",
        desc: "PSDM terdiri dari divisi Internal & Eksternal.",
        images: [sdm1],
        divisi: [
            { title: "Internal", desc: "Pembinaan anggota & penguatan koordinasi internal." },
            { title: "Eksternal", desc: "Relasi & kolaborasi eksternal untuk pengembangan anggota." },
        ],
    },
    {
        id: "sosial",
        icon: Megaphone,
        name: "Sosial",
        desc: "Sosial terdiri dari Sosial Kemasyarakatan, Dana Usaha, dan Kolaborasi & Kemitraan Sosial.",
        images: [humas1],
        divisi: [
            { title: "Sosial Kemasyarakatan", desc: "Kegiatan sosial & pengabdian." },
            { title: "Dana Usaha", desc: "Fundraising & usaha organisasi." },
            { title: "Kolaborasi & Kemitraan Sosial", desc: "Kemitraan untuk program sosial." },
        ],
    },
    {
        id: "litbang",
        icon: Code,
        name: "LITBANG IT",
        desc: "LITBANG IT terdiri dari Desain Interaktif, Rekayasa Web Aplikasi, serta Pemberdayaan & Perkembangan Teknologi.",
        images: [it1],
        divisi: [
            { title: "Desain Interaktif", desc: "UI/UX, prototype, dan desain interaktif." },
            { title: "Rekayasa Web Aplikasi", desc: "Pengembangan web/app untuk kebutuhan HIMSI." },
            { title: "Pemberdayaan & Perkembangan Teknologi", desc: "Riset & literasi teknologi anggota." },
        ],
    },
    {
        id: "kominfo",
        icon: Camera,
        name: "Kominfo",
        desc: "Kominfo terdiri dari Publikasi, Kreatif, dan Dokumentasi.",
        images: [dokumentasi1],
        divisi: [
            { title: "Publikasi", desc: "Info resmi & pengumuman HIMSI." },
            { title: "Kreatif", desc: "Konten visual & branding." },
            { title: "Dokumentasi", desc: "Foto/video kegiatan untuk arsip & publikasi." },
        ],
    },
];