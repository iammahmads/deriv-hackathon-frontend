'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowRight, X, Sparkles, ShieldCheck, Microscope, Fingerprint, Activity } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SimulationModal() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('sentinel_simulation_modal_seen')

        if (hasSeenModal) return

        const timer = setTimeout(() => {
            setIsVisible(true)
            localStorage.setItem('sentinel_simulation_modal_seen', 'true')
        }, 10000)

        return () => clearTimeout(timer)
    }, [])


    // useEffect(() => {
    //     const timer = setTimeout(() => setIsVisible(true), 10000)
    //     return () => clearTimeout(timer)
    // }, [])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg"
                    >
                        <Card className="border-primary/30 bg-card/95 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] overflow-hidden">

                            {/* Neural Graph SVG Decoration */}
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-primary pointer-events-none">
                                <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
                                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                                    <circle cx="80" cy="20" r="2" fill="currentColor" />
                                    <circle cx="50" cy="50" r="3" fill="currentColor" className="animate-pulse" />
                                    <circle cx="20" cy="80" r="2" fill="currentColor" />
                                    <circle cx="80" cy="80" r="2" fill="currentColor" />
                                    <path d="M20 20L50 50M80 20L50 50M20 80L50 50M80 80L50 50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" className="animate-[spin_10s_linear_infinite]" />
                                </svg>
                            </div>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute cursor-pointer top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>

                            <CardContent className="p-8">
                                <div className="flex flex-col gap-6">
                                    {/* Icon Header */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                            <Zap className="w-8 h-8 text-primary animate-pulse" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-2">
                                                SENTINEL_LAB ACCESS <Sparkles className="w-4 h-4 text-amber-500" />
                                            </h2>
                                            <p className="text-[10px] font-mono text-primary/70 uppercase tracking-[0.2em]">Ready for stress testing</p>
                                        </div>
                                    </div>

                                    {/* Feature Pitch */}
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Take control of the detection engine. Our **Simulation Lab** allows you to bypass standard monitoring and inject raw transaction telemetry directly into the GNN.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <Fingerprint className="w-4 h-4 text-primary" />
                                                <span className="text-[10px] font-bold uppercase">Custom Payloads</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <Activity className="w-4 h-4 text-primary" />
                                                <span className="text-[10px] font-bold uppercase">Real-time Logs</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <ShieldCheck className="w-4 h-4 text-primary" />
                                                <span className="text-[10px] font-bold uppercase">Fraud Presets</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                                                <Microscope className="w-4 h-4 text-primary" />
                                                <span className="text-[10px] font-bold uppercase">Heuristic Proof</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link href="/simulation" className="block w-full">
                                        <Button className="w-full cursor-pointer h-12 text-xs font-black uppercase tracking-[0.2em] group bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                            Initialize Simulation
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </Button>
                                    </Link>

                                    <p className="text-[9px] text-center text-muted-foreground font-mono">
                                        DEVELOPER_MODE // END_TO_END_ENCRYPTION_ACTIVE
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}