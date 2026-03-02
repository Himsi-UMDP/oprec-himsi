export type NavItem = {
    name: string;
    href: string;
};

export type NavMobileProps = {
    onNavigate?: () => void;
};

export type LogoConfig = {
    src: string;
    alt: string;
    width: number;
    height: number;
    label: string;
};