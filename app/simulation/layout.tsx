import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Simulation",
        template: "%s | SENTINAL AI Forge",
    },
};

export default function SimulationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}