import { useState, useEffect, useRef } from "react";

type ScrollDirection = "up" | "down" | "idle";

export const useScrollDirection = () => {
    const [direction, setDirection] = useState<ScrollDirection>("idle");
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    if (currentScrollY > lastScrollY.current + 5) {
                        setDirection("down");
                    } else if (currentScrollY < lastScrollY.current - 5) {
                        setDirection("up");
                    }
                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { direction };
};