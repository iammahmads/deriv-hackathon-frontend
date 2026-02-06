import { BarChart3 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-tighter uppercase opacity-50">
                    <BarChart3 className="w-3 h-3" /> Sentinel_Node_PRIME_01
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">
                    Built for High-Stakes Finance
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                <div className="flex items-center gap-4">
                    <span>© 2026 Sentinel AI</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Encrypted: AES-256</span>
                </div>
            </div>
        </footer>
    )
}