import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageCarouselProps } from "@/constans/type";


export default function ImageCarousel({
    div,
    imgIndex,
    setImgIndex,
    onClose,
}: ImageCarouselProps) {
    const images = div.images ?? [];
    const hasImages = images.length > 0;
    const hasMany = images.length > 1;

    return (
        <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
            {hasImages ? (
                <img
                    src={images[imgIndex] ?? images[0]}
                    alt={div.name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    Tidak ada gambar
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

            {hasMany && (
                <>
                    <Button
                        type="button"
                        aria-label="Sebelumnya"
                        onClick={() =>
                            setImgIndex((p) => (p - 1 + images.length) % images.length)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Button
                        type="button"
                        aria-label="Berikutnya"
                        onClick={() => setImgIndex((p) => (p + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </>
            )}

            <Button
                type="button"
                aria-label="Tutup"
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground hover:bg-destructive/20 transition-colors"
            >
                <X className="w-5 h-5" />
            </Button>

            <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <div.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-foreground">{div.name}</h3>
                    <p className="text-muted-foreground text-sm">{div.desc}</p>
                </div>
            </div>
        </div>
    );
}