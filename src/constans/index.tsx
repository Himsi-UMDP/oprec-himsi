import type { LogoConfig, NavItem } from "@/constans/type";

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