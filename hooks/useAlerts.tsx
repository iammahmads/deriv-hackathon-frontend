// hooks/useAlerts.ts
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react'

export type AlertType = "CRITICAL" | "HIGH" | "MEDIUM" | "CLEAR"

export interface Alert {
    id: string;
    created_at: string;
    ai_summary: string;
    severity: AlertType;
    graph_detected_laundering: boolean;
    transaction_ref: string; // The join key
    transactions?: { // This comes from the join query
        amount: number;
        sender_id: string;
        receiver_id: string;
        risk_score: number;
    };
}

export function useAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>([])

    useEffect(() => {
        // 1. Fetch initial alerts
        const fetchAlerts = async () => {
            // hooks/useAlerts.ts

            const { data, error } = await supabase
                .from('alerts')
                .select(`
                    id,
                    created_at,
                    ai_summary,
                    severity,
                    graph_detected_laundering,
                    transaction_ref,
                    transactions!inner (
                        amount,
                        sender_id,
                        receiver_id,
                        risk_score
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.log("Supabase Error:", error.message, error.details, error.hint);
                return;
            }

            // Force TypeScript to treat the 'transactions' array as a single object
            // by casting the data to your Alert array type
            const formattedData = (data as any[]).map(alert => ({
                ...alert,
                // If Supabase returns an array, take the first element
                transactions: Array.isArray(alert.transactions)
                    ? alert.transactions[0]
                    : alert.transactions
            })) as Alert[];

            setAlerts(formattedData);
        }

        fetchAlerts()

        const channel = supabase
            .channel('schema-db-changes')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'alerts' },
                async (payload) => {
                    // 1. Get the raw new alert
                    const newAlert = payload.new as Alert;

                    // 2. Fetch the transaction details
                    const { data: txData } = await supabase
                        .from('transactions')
                        .select('amount, sender_id, receiver_id, risk_score')
                        .eq('id', newAlert.transaction_ref)
                        .single();

                    // 3. Construct the hydrated alert
                    // We use '?? undefined' to convert any nulls to undefined to satisfy the Interface
                    const hydratedAlert: Alert = {
                        ...newAlert,
                        transactions: txData ?? undefined
                    };

                    // 4. Update state using the functional update pattern
                    setAlerts((prev: Alert[]) => [hydratedAlert, ...prev].slice(0, 10));
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel) }
    }, [])

    return alerts
}