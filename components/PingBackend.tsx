export default async function PingBackend() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, { cache: "no-store" });
        console.log("Backend ping response", response);
    } catch (err) {
        console.error("Backend ping failed", err);
    }

    return null;
}
