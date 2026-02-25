import { useState, useEffect } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { navlink } from "@/constans";
import NavMobile from "./NavMobile";

const Navbar = () => {
    const [bg, setBg] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            return window.scrollY > 50 ? setBg(true) : setBg(false);
        });
    });

    return (
        <header
            className={`${bg ? "bg-primary py-1 lg:py-2" : "bg-none"}
            fixed left-0 z-50 w-full transition-all duration-200`}
        >
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <a href="#" className="w-auto">
                        <h1
                            className={`text-3xl ${
                                bg ? "text-white" : "text-[#00405C]"
                            } relative top-4`}
                        >
                            HIMSI 
                        </h1>
                    </a>
                    <div
                        onClick={() => setMobileNav(!mobileNav)}
                        className={`md:hidden text-2xl lg:text-3xl ${
                            bg ? "text-white" : "text-[#00405C]"
                        } cursor-pointer`}
                    >
                        {mobileNav ? <CgClose /> : <CgMenuRight />}
                    </div>
                    <nav className="hidden md:flex">
                        <ul className="md:flex md:gap-x-12">
                            {navlink.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a
                                            className={`capitalize hover:border-b transition-all ${
                                                bg ? "text-white" : "text-[#00405C]"
                                            }`}
                                            href={item.href}
                                            >
                                            {item.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div
                        className={`${
                            mobileNav ? "left-0" : "-left-full"
                        } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
                    >
                        <NavMobile bg={bg} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;