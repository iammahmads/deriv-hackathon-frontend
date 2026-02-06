// components/ThreatVisualizer.tsx
import { Laptop } from "lucide-react"

export function ThreatVisualizer() {
    return (
        <div className="relative h-[220px] w-full border border-border rounded-lg bg-muted/10 overflow-hidden flex items-center justify-center group">
            {/* Radar Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-16 h-16 border border-primary/20 rounded-full animate-ping" />
                <div className="absolute w-32 h-32 border border-primary/10 rounded-full" />
                <div className="absolute w-48 h-48 border border-primary/5 rounded-full" />
            </div>

            {/* Scanning Line (from your globals.css) */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_15px_var(--color-primary)] animate-scan z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center gap-3">
                <div className="p-3 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl shadow-2xl">
                    <Laptop className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground block">
                        System Monitoring
                    </span>
                    <span className="text-[9px] font-mono text-primary/70 uppercase">
                        HEURISTIC_ENGINE_v4.0
                    </span>
                </div>
            </div>

            {/* Decorative Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>
    )
}