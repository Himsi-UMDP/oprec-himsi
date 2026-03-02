import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

            <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Open Recruitment HIMSI UMDP 2026</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                            <span className="text-foreground">Bergabung</span>
                            <br />
                            <span className="text-gradient">Bersama Kami</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Temukan potensimu, kembangkan skill, dan jadilah bagian dari perubahan.
                            Waktunya buat langkah baru!
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                        >
                            <Button size="lg" className="text-lg px-8 py-6 glow animate-pulse-glow" asChild>
                                <Link to="/daftar">Daftar Sekarang</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                                Pelajari Lebih Lanjut
                            </Button>
                        </motion.div>
                    </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
