'use client'

import { AlertCard } from '@/app/dashboard/AlertCard'
import { SecurityLog } from '@/app/dashboard/SecurityLog'
import { ThreatVisualizer } from '@/app/dashboard/ThreatVisualizer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useAlerts } from '@/hooks/useAlerts'
import { Activity, ShieldCheck, Zap, Laptop } from "lucide-react"
import SimulationInvite from './SimulationInvite'

export default function SentinelDashboard() {
    const alerts = useAlerts()

    return (
        <>
            <SimulationInvite />
            <div className="min-h-screen bg-background text-foreground p-8 transition-colors duration-300">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Scanned"
                        value="1,284"
                        icon={<Activity className="w-4 h-4 text-primary" />}
                    />
                    <StatCard
                        title="AI Deep Dives"
                        value={alerts.length.toString()}
                        icon={<Zap className="w-4 h-4 text-yellow-500" />}
                    />
                    <StatCard
                        title="Shielded Assets"
                        value="$4.2M"
                        icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
                    />
                </div>

                {/* Main Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                Incident Feed
                                <span className="text-[10px] bg-destructive text-destructive-foreground px-2 py-0.5 rounded font-black uppercase">
                                    Live
                                </span>
                            </h2>
                            <p className="text-xs text-muted-foreground font-mono">{alerts.length} signals detected</p>
                        </div>

                        {alerts.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5">
                                <p className="text-muted-foreground italic animate-pulse">Waiting for incoming telemetry...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {alerts.map((alert) => (
                                    <AlertCard key={alert.id} alert={alert} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Intelligence */}
                    <div className="space-y-6">
                        {/* Card 1: Visualizer */}
                        <Card className="bg-card border-border shadow-md overflow-hidden">
                            <CardHeader className="pb-3 border-b border-border/50 bg-muted/5">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    Neural Threat Map
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <ThreatVisualizer />
                            </CardContent>
                        </Card>

                        {/* Card 2: Real-time System Logs */}
                        <Card className="bg-card border-border shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    Process Telemetry
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Pass the real-time alerts here! */}
                                <SecurityLog />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <Card className="bg-card border-border backdrop-blur-sm transition-all hover:border-primary/50 group">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-tighter text-muted-foreground group-hover:text-primary transition-colors">
                        {title}
                    </p>
                    <div className="p-2 bg-muted rounded-md">{icon}</div>
                </div>
                <div className="text-3xl font-black mt-3 tracking-tighter text-foreground">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}