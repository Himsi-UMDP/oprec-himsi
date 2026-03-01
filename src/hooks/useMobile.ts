import { useState, useCallback } from "react";

export const useMobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    return { isOpen, close, toggle };
};