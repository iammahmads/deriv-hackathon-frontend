import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "%s | SENTINAL AI Forge",
    },
};

export default function DashboardLayout({
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