import { CgMenuRight, CgClose } from "react-icons/cg";
import { navlink, logoConfig } from "@/constans";
import { useNavbarScroll } from "@/hooks/useNavbar";
import { useMobileNav } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import NavMobile from "./NavMobile";

const Navbar = () => {
    const { hasScrolled } = useNavbarScroll();
    const { isOpen, close, toggle } = useMobileNav();

    return (
        <nav className={cn(
            "flex top-0 z-50 fixed w-full items-center justify-between py-4 transition-all duration-300",
            hasScrolled
                ? "bg-white/20 backdrop-blur-md shadow-md"
                : "bg-transparent"
        )}>
            <div className="mx-4 md:mx-8 lg:mx-40 flex items-center justify-between w-full font-medium">

                <a href="#" className="flex items-center gap-3">
                    <img
                        src={logoConfig.src}
                        alt={logoConfig.alt}
                        width={logoConfig.width}
                        height={logoConfig.height}
                        className="rounded-2xl"
                    />
                    <span className="hidden sm:inline text-foreground font-semibold hover:text-[#2464A8] transition-colors duration-300">
                        {logoConfig.label}
                    </span>
                </a>

                <div className="hidden md:flex gap-8 items-center font-semibold">
                    {navlink.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="text-foreground hover:text-[#2464A8] transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <button
                    onClick={toggle}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 text-foreground z-50 relative"
                >
                    {isOpen ? <CgClose size={24} /> : <CgMenuRight size={24} />}
                </button>

                <div className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-start",
                    "transition-all duration-300 md:hidden",
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}>
                    <NavMobile onNavigate={close} />
                </div>

            </div>
        </nav>
    );
};

export default Navbar;