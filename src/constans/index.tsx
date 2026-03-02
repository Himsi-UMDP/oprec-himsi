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