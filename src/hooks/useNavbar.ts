import { useState, useEffect } from "react";
import { SCROLL_THRESHOLD } from "@/constans";

export const useNavbarScroll = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { hasScrolled };
};