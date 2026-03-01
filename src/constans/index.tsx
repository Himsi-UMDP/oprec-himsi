export type NavItem = {
    name: string;
    href: string;
};

export type NavMobileProps = {
    onNavigate?: () => void;
}

export const SCROLL_THRESHOLD = 50;

export const navlink = [
    {
        name: "Home",
        href: "#home"
    },
    {
        name: "Pengumuman",
        href: "#pengumuman"
    },
    {
        name: "Kontak",
        href: "#kontak"
    },
]