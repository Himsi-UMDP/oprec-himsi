import type { NavMobileProps } from "@/constans/type";
import { navlink } from "@/constans";

const NavMobile = ({ onNavigate }: NavMobileProps) => {
    return (
        <div className="absolute top-16 flex flex-col space-y-8 text-xl">
            {navlink.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className="text-foreground/80 hover:text-[#2464A8] transition-colors duration-300"
                    >
                    {item.name}
                </a>
            ))}
        </div>
    );
};

export default NavMobile;