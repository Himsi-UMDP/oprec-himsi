import type { ElementType, Dispatch, SetStateAction } from "react";

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

export type Divisi = {
    title: string;
    desc: string;
};

export type Division = {
    id: string;              
    icon: ElementType;       
    name: string;
    desc: string;
    images?: string[];       
    divisi?: Divisi[];
};

export type DivisionCardProps = {
    d: Division;
    onClick: () => void;
};

export type ImageCarouselProps = {
    div: Division;
    imgIndex: number;
    setImgIndex: Dispatch<SetStateAction<number>>;
    onClose: () => void;
};

export type ProkerListProps = {
    div: Division;
};

export type DetailModalProps = ImageCarouselProps;

export type Proker = {
    id: string;
    images: string[];
    title: string;
    desc: string;
};

export type Timeline = {
    id: string;
    date: string;
    title: string;
    desc: string;
};

export type Faq = {
    id: string;
    q: string;
    a: string;
};