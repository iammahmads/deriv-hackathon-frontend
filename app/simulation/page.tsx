'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Lock, Loader2, Database, ShieldAlert, Code2, History } from "lucide-react"

export default function SimulationLab() {
    const [loading, setLoading] = useState(false)
    const [apiKey, setApiKey] = useState('')
    const [logs, setLogs] = useState<any[]>([])
    const [formData, setFormData] = useState({
        txId: `TX-${Math.floor(Math.random() * 10000)}`,
        senderId: 'user_882',
        receiverId: 'merchant_01',
        amount: '10000.00',
        type: 'TRANSFER' // Default type
    })

    const runAnalysis = async (runType: 'manual' | 'preset_fraud' | 'preset_clean') => {
        setLoading(true)

        let amount = parseFloat(formData.amount);
        let senderId = formData.senderId;
        let receiverId = formData.receiverId;
        let txId = formData.txId;
        let type = formData.type;

        let oldLog: number, newOrig: number, oldDest: number, newDest: number;
        let isFraudScenario = false;

        if (runType === 'preset_fraud') {
            txId = `ATTACK-${Math.floor(Math.random() * 9999)}`;
            // Match Python: High amount (900k - 2M)
            amount = Math.floor(Math.random() * (2000000 - 900000) + 900000);
            senderId = "mule_account_01";
            receiverId = "offshore_drain";
            type = "TRANSFER"; // Matches Python payload
            isFraudScenario = true;

            // Match Python Scenario: Emptying a high-value account
            oldLog = amount + Math.random() * 500;
            newOrig = 0; // Account wiped
            oldDest = 0;
            newDest = amount; // Destination gets the full amount
        } else if (runType === 'preset_clean') {
            txId = `NORM-${Math.floor(Math.random() * 9999)}`;
            amount = Number((Math.random() * (500 - 10) + 10).toFixed(2));
            senderId = "verified_user";
            receiverId = "starbucks_coffee";
            type = "TRANSFER";
            isFraudScenario = false;

            // Match Python Scenario: Normal small transfer
            oldLog = Math.random() * (5000 - 1000) + 1000;
            newOrig = oldLog - amount;
            oldDest = Math.random() * (2000 - 100) + 100;
            newDest = oldDest + amount;
        } else {
            // Manual logic
            isFraudScenario = amount > 10000;
            oldLog = isFraudScenario ? amount + 100 : amount + 2000;
            newOrig = isFraudScenario ? 0 : oldLog - amount;
            oldDest = 100;
            newDest = oldDest + amount;
        }

        // Calculate 'Hidden' features exactly like the Python version
        const errorBalanceSender = amount + newOrig - oldLog;
        const errorBalanceReceiver = oldDest + amount - newDest;

        const payload = {
            tx_id: txId,
            sender_id: senderId,
            receiver_id: receiverId,
            amount: amount,
            type: type,
            features: [
                amount,
                oldLog,
                newOrig,
                oldDest,
                newDest,
                errorBalanceSender,
                errorBalanceReceiver
            ]
        };

        // 4. Execute API Call
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-OpenAI-Key': apiKey
                },
                body: JSON.stringify(payload)
            });
            const result = await res.json();

            setLogs(prev => [{ id: txId, timestamp: new Date().toLocaleTimeString(), payload, result }, ...prev]);

            if (runType === 'manual') {
                setFormData(prev => ({ ...prev, txId: `TX-${Math.floor(Math.random() * 10000)}` }));
            }
        } catch (e) {
            console.error("Connection Error:", e);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="min-h-screen bg-background p-8 font-sans">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex flex-col gap-1 border-l-4 border-primary pl-4">
                        <h1 className="text-3xl font-black uppercase italic">Sentinel Simulation Lab</h1>
                        <p className="text-muted-foreground text-sm font-mono">Manual Data Injection & Heuristic Stress Testing</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        <Card className="border-border bg-card/50 backdrop-blur-md shadow-xl">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" /> Input Configuration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border">
                                    <Label className="text-[10px] font-black uppercase flex items-center gap-2">
                                        <Lock className="w-3 h-3 text-amber-500" /> OpenAI API Key
                                    </Label>
                                    <Input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="sk-proj-..."
                                        className="h-8 text-xs font-mono bg-background"
                                    />
                                </div>

                                <Tabs defaultValue="manual" className="w-full">
                                    <TabsList className="grid grid-cols-2 w-full mb-4">
                                        <TabsTrigger value="manual" className="text-[10px] uppercase font-bold">Manual Entry</TabsTrigger>
                                        <TabsTrigger value="presets" className="text-[10px] uppercase font-bold">Presets</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="manual" className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <Label className="text-[9px] uppercase font-bold">Reference ID</Label>
                                                <Input
                                                    value={formData.txId}
                                                    onChange={(e) => setFormData({ ...formData, txId: e.target.value })}
                                                    className="h-8 text-xs font-mono"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[9px] uppercase font-bold">TX Type</Label>
                                                <Select
                                                    value={formData.type}
                                                    onValueChange={(v) => setFormData({ ...formData, type: v })}
                                                >
                                                    <SelectTrigger className="h-8 text-[10px] font-bold">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                                                        <SelectItem value="CASH_OUT">CASH OUT</SelectItem>
                                                        <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                                                        <SelectItem value="DEBIT">DEBIT</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <Label className="text-[9px] uppercase font-bold">Sender ID</Label>
                                                <Input
                                                    value={formData.senderId}
                                                    onChange={(e) => setFormData({ ...formData, senderId: e.target.value })}
                                                    className="h-8 text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[9px] uppercase font-bold">Receiver ID</Label>
                                                <Input
                                                    value={formData.receiverId}
                                                    onChange={(e) => setFormData({ ...formData, receiverId: e.target.value })}
                                                    className="h-8 text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[9px] uppercase font-bold">Amount ($)</Label>
                                            <Input
                                                type="number"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                        <Button
                                            disabled={loading || !apiKey}
                                            onClick={() => runAnalysis('manual')}
                                            className="w-full h-10 text-xs font-black uppercase tracking-widest mt-2 bg-primary hover:bg-primary/90"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Database className="w-4 h-4 mr-2" /> Analyze Data</>}
                                        </Button>
                                    </TabsContent>

                                    <TabsContent value="presets" className="grid grid-cols-1 gap-2">
                                        {/* Presets remain the same, logic handled in runAnalysis */}
                                        <Button
                                            variant="destructive"
                                            className="h-14 text-[10px] cursor-pointer font-black uppercase flex flex-col items-center justify-center gap-1 group shadow-lg shadow-red-500/10"
                                            onClick={() => runAnalysis('preset_fraud')}
                                            disabled={loading || !apiKey}
                                        >
                                            <span className="flex items-center gap-2">
                                                <ShieldAlert className="w-4 h-4 group-hover:animate-pulse" />
                                                Trigger High-Risk Attack
                                            </span>
                                            <span className="text-[8px] font-normal opacity-80 italic">Auto-generates CASH_OUT Telemetry</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-14 text-[10px] cursor-pointer font-black uppercase flex flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/10"
                                            onClick={() => runAnalysis('preset_clean')}
                                            disabled={loading || !apiKey}
                                        >
                                            <span>Run Standard Payment</span>
                                            <span className="text-[8px] font-normal opacity-60 italic">Legitimate PAYMENT Baseline</span>
                                        </Button>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* RIGHT SIDE: FEED */}
                        <div className="space-y-4 border border-border rounded-lg p-4 bg-black/20">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Code2 className="w-3 h-3 text-primary" /> Live Backend Stream
                                </h3>
                                <div className="flex items-center gap-2">
                                    {loading && <span className="text-[8px] font-mono text-primary animate-pulse">PROCESSING_PACKET...</span>}
                                    <div className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-amber-500 animate-bounce' : 'bg-primary animate-ping'}`} />
                                </div>
                            </div>

                            <div className="h-[520px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-primary/10">

                                {/* ACTIVE LOADING STATE: Shows at the top of the feed */}
                                {loading && (
                                    <div className="p-4 bg-primary/5 border border-primary/30 rounded-lg border-dashed animate-pulse">
                                        <div className="flex justify-between items-start mb-3 border-b border-primary/10 pb-2">
                                            <span className="text-[10px] font-mono text-primary italic flex items-center gap-2">
                                                <Loader2 className="w-3 h-3 animate-spin" /> INCOMING_TX...
                                            </span>
                                            <span className="text-[8px] opacity-50">SYNCING</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-3/4 bg-primary/10 rounded" />
                                            <div className="h-2 w-1/2 bg-primary/10 rounded" />
                                            <div className="h-2 w-5/6 bg-primary/10 rounded" />
                                        </div>
                                        <p className="text-[9px] font-mono text-primary/40 mt-3 animate-pulse">
                                            &gt; Running GNN Graph Analysis...<br />
                                            &gt; Polling ML Model Weights...
                                        </p>
                                    </div>
                                )}

                                {/* LOG HISTORY */}
                                {logs.length === 0 && !loading ? (
                                    <div className="h-full flex flex-col items-center justify-center border border-dashed border-border rounded-xl opacity-40">
                                        <History className="w-8 h-8 mb-2" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-center">Awaiting initial<br />packet injection</p>
                                    </div>
                                ) : (
                                    logs.map((log) => (
                                        <div key={log.id} className="p-4 bg-card/80 border border-border rounded-lg animate-in fade-in slide-in-from-top-4 duration-500">
                                            <div className="flex justify-between items-start mb-3 border-b border-border pb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-mono text-primary italic">{log.payload.type} // {log.id}</span>
                                                    <span className="text-[7px] text-muted-foreground uppercase">Sender: {log.payload.sender_id}</span>
                                                </div>
                                                <span className="text-[8px] opacity-50 font-mono">{log.timestamp}</span>
                                            </div>

                                            {/* Pretty Print the Result */}
                                            <pre className="text-[9px] font-mono text-muted-foreground overflow-x-auto bg-black/40 p-2 rounded border border-white/5">
                                                {JSON.stringify(log.result, null, 2)}
                                            </pre>

                                            {/* Dynamic Status Tag if it exists */}
                                            {log.result.verdict && (
                                                <div className="mt-2 flex justify-end">
                                                    <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${["CRITICAL", "HIGH"].includes(log.result.severity)
                                                        ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                                                        : log.result.severity === "MEDIUM"
                                                            ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                                                            : 'bg-green-500/20 text-green-500 border border-green-500/50'
                                                        }`}>
                                                        {log.result.verdict}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}