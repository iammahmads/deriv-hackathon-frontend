"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, Zap } from "lucide-react"
import ThemeToggleButton from "./ThemeToggleButton"
import clsx from "clsx"

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Simulation", href: "/simulation" },
    // { label: "Settings", href: "/settings" },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-24 items-center justify-between">

                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <ShieldCheck className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl font-black italic">
                            SENTINEL
                        </span>
                        <span className="text-base font-bold text-primary tracking-[0.2em] uppercase">
                            AI Forge
                        </span>
                    </div>
                </Link>

                {/* Navigation & Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
                        {navItems.map(({ label, href }) => {
                            const isActive = pathname.startsWith(href)

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>


                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <Zap className="w-3 h-3 fill-current" />
                            LIVE OPS
                        </div>

                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </header>
    )
}
