import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ShieldAlert, ArrowRight, Activity } from "lucide-react"
import { Alert } from "@/hooks/useAlerts"

const getRiskColor = (score: number, isLaundering: boolean) => {
    // Priority 1: GNN detected laundering is always Critical
    if (isLaundering) return "bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]";

    // Priority 2: ML Risk Percentage
    if (score >= 90) return "bg-red-600 border-red-400 text-white animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.3)]";
    if (score >= 70) return "bg-orange-500 border-orange-300 text-white";
    if (score >= 40) return "bg-amber-500 border-amber-300 text-black";

    // Default: Low Risk
    return "bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400";
};

export function AlertCard({ alert }: { alert: Alert }) {
    const isLaundering = alert.graph_detected_laundering;
    const riskPercentage = Math.round((alert?.transactions?.risk_score || 0) * 100)

    return (
        <Card className={`overflow-hidden border-2 transition-all hover:ring-2 hover:ring-primary/20 bg-card/50 backdrop-blur-sm ${isLaundering ? 'border-purple-500/50' : 'border-destructive/50'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-muted/30">
                <div className="flex items-center gap-2">
                    <Activity className={`w-4 h-4 ${isLaundering ? "text-purple-400" : "text-destructive"}`} />
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        {isLaundering ? "Pattern Match / ML Alert" : "Alert"}
                    </CardTitle>
                </div>
                {typeof alert.transactions?.risk_score === "number" && (
                    <Badge
                        className={`
                            font-black px-2 py-0.5 border transition-all duration-500
                            ${getRiskColor(riskPercentage, !!isLaundering)}
                        `}
                    >
                        {isLaundering && <span className="mr-1">⚠️</span>}
                        {riskPercentage}% RISK
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-4xl font-black tracking-tighter text-foreground">
                            ${alert.transactions?.amount?.toLocaleString() ?? "---"}
                        </div>
                        <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                            <span className="text-primary font-bold">{alert.transactions?.sender_id ?? "ID_UNKNOWN"}</span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            <span className="text-emerald-500 font-bold">{alert.transactions?.receiver_id ?? "ID_UNKNOWN"}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-background/80 border border-border p-3 rounded-md flex gap-3">
                    <Brain className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm leading-relaxed text-foreground font-medium italic">
                        "{alert.ai_summary}"
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">TX: {alert.transaction_ref.slice(0, 8)}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{new Date(alert.created_at).toLocaleTimeString()}</span>
                </div>
            </CardContent>
        </Card>
    )
}