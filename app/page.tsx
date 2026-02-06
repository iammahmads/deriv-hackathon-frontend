import Link from 'next/link';
import {
  ShieldCheck,
  Activity,
  Zap,
  Globe,
  ArrowRight,
  Fingerprint
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative pt-24 pb-20 px-6">
        {/* Dynamic Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto text-center relative">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Neural Network: Online
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent leading-[0.9]">
            STOP FRAUD <br />
            <span className="text-primary italic">BEFORE</span> IT SETTLES.
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-lg leading-relaxed mb-10 font-medium">
            Next-generation financial surveillance using
            <span className="text-foreground"> Graph Neural Networks </span> and
            <span className="text-foreground"> Real-time ML </span> to expose layering schemes
            and high-velocity attacks.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary Action */}
            <Link href="/dashboard">
              <button className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all flex items-center justify-center gap-3 group">
                ENTER DASHBOARD <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary Action: Simulation */}
            <Link href="/simulation">
              <button className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm font-bold text-sm hover:bg-accent transition-all flex items-center justify-center gap-3 group">
                <Zap className="w-4 h-4 text-primary group-hover:fill-primary transition-all" />
                RUN_SIMULATION
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. WHY COMPLIANCE & RISK ANALYSIS */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-[2.5rem] border border-border bg-card overflow-hidden">

          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 p-12">

            {/* Left: Narrative */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Compliance & Risk
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Why Compliance Is <span className="text-primary italic">Non-Negotiable</span>
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xl">
                Financial institutions don’t fail because fraud exists — they fail because
                fraud goes <span className="text-foreground font-semibold">undetected, unexplained, or unreported</span>.
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                Regulatory frameworks like AML, CTF, and KYC demand more than detection.
                They require <span className="text-foreground font-semibold">traceability, justification, and auditability</span>
                for every decision made at scale.
              </p>
            </div>

            {/* Right: Risk Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-6 rounded-2xl border border-border bg-background/50">
                <ShieldCheck className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-2">Regulatory Exposure</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Missed suspicious activity can lead to fines, license revocation,
                  and enforced remediation programs.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background/50">
                <Activity className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-2">Operational Overload</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Legacy systems generate thousands of false positives,
                  burning analyst time and increasing real risk.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background/50">
                <Globe className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-2">Cross-Border Complexity</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Global transactions introduce jurisdictional risk,
                  sanction exposure, and opaque fund flows.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background/50">
                <Zap className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-2">Real-Time Expectations</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Modern compliance demands decisions in milliseconds —
                  not post-settlement reports.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. THE SENTINEL PIPELINE */}
      {/* 2.5 INTERMEDIATE SECTION: THE SENTINEL PIPELINE */}
      <div className="py-24 bg-slate-50 dark:bg-[#020202] border-y border-border relative overflow-hidden transition-colors duration-300">

        {/* Decorative Background Code Stream - Swapped for light/dark adaptive colors */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] font-mono text-[10px] leading-none pointer-events-none select-none overflow-hidden h-full text-slate-900 dark:text-white">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap mb-1">
              {`0x${Math.random().toString(16)}...analyze_node_${i}...graph_weights_updated...vector_id_${Math.floor(Math.random() * 1000)}...status_200`}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left side: Animated Terminal */}
            <div className="lg:col-span-7 group">
              {/* Terminal Container: Adapts from White/Glass to Black/Glass */}
              <div className="relative rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl transition-transform hover:-rotate-1 duration-500">

                {/* Terminal Header: Adaptive colors */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-muted-foreground ml-2 tracking-widest uppercase">
                    SENTINEL_CORE_ENGINE --live_stream
                  </div>
                </div>

                {/* Terminal Body: Swapped text-white for text-slate-900 in light mode */}
                <div className="p-6 font-mono text-[13px] h-[300px] overflow-hidden leading-relaxed text-slate-800 dark:text-white/90">
                  <div className="text-emerald-600 dark:text-emerald-400 mb-2 font-bold">{'>'} Initializing Hybrid Analysis...</div>
                  <div className="opacity-60 mb-1">{'>'} Loading GNN Weights: [####################] 100%</div>
                  <div className="opacity-60 mb-1">{'>'} Connecting to Global Ledger Node: 14.221.0.9</div>

                  <div className="text-primary mt-4 animate-pulse italic font-black uppercase tracking-tight">
                    ● INCOMING TRANSACTION DETECTED
                  </div>

                  <div className="opacity-80 ml-4 mb-1 border-l-2 border-primary/30 pl-3">
                    TX_HASH: 0x82f...a12 | AMOUNT: 1.2M USD <br />
                    SENDER: MULE_ACCOUNT_01 | RECEIVER: OFFSHORE_04
                  </div>

                  <div className="opacity-60 mt-4 italic font-semibold">{'>'} Executing Layering Analysis (3 hops deep)...</div>

                  <div className="text-red-600 dark:text-red-400 font-black mt-2 animate-bounce flex items-center gap-2">
                    <span className="bg-red-100 dark:bg-red-900/30 px-1 rounded">!!! CRITICAL RISK DETECTED: HIGH_PROBABILITY_LAUNDERING</span>
                  </div>

                  <div className="opacity-40 mt-2">{'>'} Generating SAR Report...</div>
                </div>
              </div>
            </div>

            {/* Right side: Summary */}
            <div className="lg:col-span-5">
              <h3 className="text-4xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white">
                Data-In to <br />
                <span className="text-primary italic">Intelligence-Out.</span>
              </h3>

              <ul className="space-y-8">
                {[
                  { id: 1, title: "Vector Ingestion", desc: "Transactions are converted into high-dimensional vector embeddings in real-time." },
                  { id: 2, title: "Structural Analysis", desc: "The graph engine scans for hidden links that traditional SQL databases can't see." },
                  { id: 3, title: "Autonomous Verdict", desc: "ML models weigh 150+ features to deliver a precise risk score in under 2ms." }
                ].map((item) => (
                  <li key={item.id} className="flex gap-5 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 text-xs font-black text-primary transition-transform group-hover:scale-110">
                      0{item.id}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed">
                      <strong className="text-slate-900 dark:text-foreground block text-base mb-1 font-bold">{item.title}</strong>
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>


      {/* 4. THE INTELLIGENCE GRID */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Main Intelligence Tile */}
          <div className="md:col-span-2 row-span-2 group relative p-8 rounded-[2rem] border border-border bg-card hover:border-primary/50 transition-all overflow-hidden shadow-sm">
            <div className="absolute -right-10 -bottom-10 p-8 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform">
              <Globe className="w-64 h-64 text-foreground" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-4">GNN Engine v3</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  Our Graph Neural Network maps relationships across millions of nodes to detect
                  circular transfers and structural anomalies in transaction chains.
                </p>
              </div>

              <div className="mt-12 flex gap-10 border-t border-border pt-8">
                <div>
                  <div className="text-3xl font-black text-primary italic">99%</div>
                  <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary italic">&lt;2ms</div>
                  <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Latency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Feature */}
          <div className="md:col-span-2 p-8 rounded-[2rem] border border-border bg-card flex items-center gap-6 group hover:bg-accent/50 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Autonomous SARs</h3>
              <p className="text-sm text-muted-foreground">LLM-powered forensic reporting for regulatory compliance.</p>
            </div>
          </div>

          {/* Real-time Feature */}
          <div className="p-8 rounded-[2rem] border border-border bg-card group hover:border-primary/50 transition-all">
            <Zap className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold mb-2">Instant Scoring</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hybrid ML validation on every packet injection.
            </p>
          </div>

          {/* Security Feature */}
          <div className="p-8 rounded-[2rem] border border-border bg-card group hover:border-primary/50 transition-all">
            <Fingerprint className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold mb-2">Entity Linking</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Resolving identities across disparate transaction types.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;