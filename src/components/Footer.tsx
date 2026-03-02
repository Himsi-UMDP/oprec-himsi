import { Instagram, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-border/50 py-12 px-4">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <span className="font-display text-lg font-bold text-gradient">OPREC 2026</span>
                    <p className="text-sm text-muted-foreground mt-1">© 2026 All rights reserved.</p>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
