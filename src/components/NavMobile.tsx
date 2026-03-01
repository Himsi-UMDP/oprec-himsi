import { navlink, type NavMobileProps } from "@/constans";

const NavMobile = ({ onNavigate }: NavMobileProps) => {
    return (
        <div className="absolute top-16 flex flex-col space-y-8 text-xl">
            {navlink.map((item, index) => (
                <a
                    key={index}
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