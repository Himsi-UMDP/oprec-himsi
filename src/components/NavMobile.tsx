import { navlink, type NavMobileProps } from "@/constans";

const NavMobile = ({ bg, onNavigate }: NavMobileProps) => {
    return (
        <nav className="bg-[#00405C] text-white shadow-2xl w-full h-full">
            <ul className="text-center h-full flex flex-col items-center justify-center gap-y-6">
                {navlink.map((item, index) => (
                    <li key={index}>
                        <a
                            className={`text-xl font-medium capitalize ${
                                bg ? "text-white" : "text-[#00405C]"
                            }`}
                            href={item.href}
                            onClick={onNavigate}
                            >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavMobile;