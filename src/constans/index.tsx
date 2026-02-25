export type NavItem = {
    name: string;
    href: string;
};

export type NavMobileProps = {
    bg: boolean;
    onNavigate?: () => void;
}

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