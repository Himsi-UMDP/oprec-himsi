import { useState } from "react";
import { divisions } from "@/constans";
import type { Division } from "@/constans/type";

type UseDivisiReturn = {
    selectedDivision: Division | null;
    imgIndex: number;
    setImgIndex: React.Dispatch<React.SetStateAction<number>>;
    openDetail: (i: number) => void;
    closeDetail: () => void;
};

export const useDivisi = (): UseDivisiReturn => {
    const [selected, setSelected] = useState<number | null>(null);
    const [imgIndex, setImgIndex] = useState(0);

    const selectedDivision = selected !== null ? divisions[selected] : null;

    const openDetail = (i: number) => {
        setSelected(i);
        setImgIndex(0);
    };

    const closeDetail = () => setSelected(null);

    return { selectedDivision, imgIndex, setImgIndex, openDetail, closeDetail };
};