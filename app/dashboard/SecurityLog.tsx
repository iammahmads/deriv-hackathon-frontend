// components/SecurityLog.tsx
import { useAlerts } from "@/hooks/useAlerts";

export function SecurityLog() {
    const alerts = useAlerts();

    // If no alerts, show a system "waiting" state
    if (alerts.length === 0) {
        return (
            <div className="space-y-2 font-mono text-[10px] animate-pulse">
                <div className="flex gap-2 text-muted-foreground">
                    <span>{new Date().toLocaleTimeString()}</span>
                    <span>Initializing heuristic engine...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-2 font-mono text-[10px]">
            {alerts.slice(0, 5).map((alert, i) => (
                <div key={alert.id || i} className="flex flex-col border-l-2 border-primary/30 pl-2 py-1 bg-primary/5 mb-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground">{new Date(alert.created_at).toLocaleTimeString()}</span>
                        <span className={`font-bold ${alert.severity === 'CRITICAL' ? 'text-red-500' : 'text-primary'}`}>
                            {alert.severity || 'INFO'}
                        </span>
                    </div>
                    <div className="text-foreground/90 leading-tight">
                        {/* We use the AI summary as the "log" message */}
                        {alert.ai_summary.slice(0, 60)}...
                    </div>
                </div>
            ))}
        </div>
    )
}