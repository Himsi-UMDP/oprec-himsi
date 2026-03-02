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

export type Hero = {
    badge: string;
    headingMain: string;
    headingAccent: string;
    description: string;
    primaryCTA: {
        label: string;
        href: string;
    };
    secondaryCTA: {
        label: string;
        href: string;
    };
};