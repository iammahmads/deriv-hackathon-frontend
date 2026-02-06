'use client'

import { useState, useEffect, useRef } from 'react'
import { X, BellRing } from 'lucide-react'
import { useAlerts, Alert } from '@/hooks/useAlerts'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, Activity } from "lucide-react"

// Reusing your existing logic helper
const getRiskColor = (score: number, isLaundering: boolean) => {
    if (isLaundering) return "bg-purple-600 border-purple-400 text-white shadow-[0_0_8px_rgba(147,51,234,0.4)]";
    if (score >= 90) return "bg-red-600 border-red-400 text-white animate-pulse";
    if (score >= 70) return "bg-orange-500 text-white";
    return "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
};

function MiniAlertCard({ alert }: { alert: Alert }) {
    const isLaundering = alert.graph_detected_laundering;
    const riskPercentage = Math.round((alert?.transactions?.risk_score || 0) * 100);

    return (
        <Card className={`w-80 overflow-hidden border-2 bg-black/80 backdrop-blur-xl shadow-2xl transition-all ${isLaundering ? 'border-purple-500/50' : 'border-destructive/50'}`}>
            <CardContent className="p-0">
                {/* Header Strip */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted/20 border-b border-border">
                    <div className="flex items-center gap-2">
                        <Activity className={`w-3 h-3 ${isLaundering ? "text-purple-400" : "text-destructive"}`} />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">
                            Live Intercept
                        </span>
                    </div>
                    <Badge className={`h-4 text-[8px] font-black px-1.5 ${getRiskColor(riskPercentage, !!isLaundering)}`}>
                        {riskPercentage}% RISK
                    </Badge>
                </div>

                {/* Main Content Area */}
                <div className="p-3 space-y-2">
                    <div className="flex justify-between items-end">
                        <div className="text-2xl font-black tracking-tighter text-foreground">
                            ${alert.transactions?.amount?.toLocaleString() ?? "0"}
                        </div>
                        <div className="flex items-center gap-1.5 mb-1 font-mono text-[9px] opacity-70">
                            <span className="text-primary truncate max-w-[50px]">{alert.transactions?.sender_id}</span>
                            <ArrowRight className="w-2 h-2" />
                            <span className="text-emerald-500 truncate max-w-[50px]">{alert.transactions?.receiver_id}</span>
                        </div>
                    </div>

                    {/* Compact Brain Summary */}
                    <div className="flex gap-2 p-2 bg-white/5 rounded border border-white/10">
                        <Brain className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="text-[10px] leading-tight text-foreground/90 italic line-clamp-2">
                            {alert.ai_summary}
                        </p>
                    </div>
                </div>

                {/* Footer Timer Strip */}
                <div className="flex justify-between items-center px-3 py-1 bg-black/40 text-[8px] font-mono opacity-50 border-t border-white/5">
                    <span>REF: {alert.transaction_ref.slice(0, 6)}</span>
                    <span>{new Date(alert.created_at).toLocaleTimeString()}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export function AlertNotification() {
    const alerts = useAlerts()
    const [activeAlert, setActiveAlert] = useState<Alert | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Trigger notification when a new alert arrives in the stream
    useEffect(() => {
        if (alerts.length > 0) {
            const latest = alerts[0]
            const isRecent = new Date().getTime() - new Date(latest.created_at).getTime() < 10000

            if (isRecent) {
                setActiveAlert(latest)
                setIsVisible(true)
                startTimer()
            }
        }
    }, [alerts])

    const startTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            if (!isHovered) {
                handleClose()
            }
        }, 5000)
    }

    const handleClose = () => {
        setIsVisible(false)
        // Delay clearing data to allow exit animation
        setTimeout(() => setActiveAlert(null), 300)
    }

    // Reset timer if hover state changes
    useEffect(() => {
        if (isHovered) {
            if (timerRef.current) clearTimeout(timerRef.current)
        } else if (isVisible) {
            startTimer()
        }
    }, [isHovered])

    if (!activeAlert) return null

    return (
        <div
            className={`fixed bottom-6 right-6 z-100 w-[400px] transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95 pointer-events-none'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header / Dismiss Button */}
            <div className="absolute top-2 right-2 z-110">
                <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Visual Indicator of "Live" status */}
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-[8px] font-black italic uppercase text-primary-foreground rounded-sm flex items-center gap-1 animate-bounce">
                <BellRing className="w-2 h-2" /> Live Intercept
            </div>

            {/* Using your existing AlertCard component */}
            <div className="shadow-2xl shadow-black/50">
                <MiniAlertCard alert={activeAlert} />
            </div>

            {/* Countdown progress bar */}
            {!isHovered && (
                <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full overflow-hidden rounded-b-lg">
                    <div className="h-full bg-primary animate-shrink" style={{ animationDuration: '5s' }} />
                </div>
            )}
        </div>
    )
}