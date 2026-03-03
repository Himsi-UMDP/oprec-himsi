import Animated from "@/components/Animated";

export default function OprecShell({ children }: { children: React.ReactNode }) {
    return (
        <section id="oprec" className="relative py-24 bg-himsi-hero overflow-x-visible">
            <div className="relative container mx-auto px-4 overflow-x-visible">
                <Animated className="text-center space-y-3">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-[#d3a32d]">
                        Oprec
                        <span className="text-[#5a9fd4]"> Himsi</span>
                    </h2>
                </Animated>

                <div className="mt-10 max-w-3xl mx-auto glass-card p-6 md:p-8 relative overflow-visible">
                    {children}
                </div>
            </div>
        </section>
    );
}