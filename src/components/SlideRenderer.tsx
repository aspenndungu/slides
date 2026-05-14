import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Phone, Trophy, Mic2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SlideData } from "@/src/data/slides";

const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "accent" | "dark", key?: string }) => (
  <div className={cn(
    "px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border transition-all duration-300",
    variant === "default" && "bg-white/5 border-white/10 text-white/70",
    variant === "accent" && "bg-accent border-transparent text-white shadow-[0_0_20px_rgba(255,59,46,0.3)]",
    variant === "dark" && "bg-black border-white/20 text-white"
  )}>
    {children}
  </div>
);

const PhoneUI = ({ caption }: { caption: string }) => (
  <div className="aspect-[9/16] w-full max-w-[320px] mx-auto rounded-[48px] bg-ink border-[10px] border-panel-dark/20 shadow-2xl overflow-hidden relative">
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/10 rounded-full z-20" />
    <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-bg/40 to-bg" />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-accent rounded-full blur-2xl"
        />
        <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center relative z-10 bg-black/40 backdrop-blur-sm">
          <Phone className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="flex gap-2 h-10 items-end">
        {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
          <motion.div 
            key={i}
            animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
            className="w-1.5 bg-accent rounded-full"
          />
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 w-full p-4 text-center bg-white text-ink font-mono text-[9px] tracking-widest font-bold">
      {caption}
    </div>
  </div>
);

const UIMock = ({ name, color = "accent", items }: { name: string, color?: string, items: string[] }) => (
  <div className="w-full bg-black/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
    <div className="p-4 border-b border-white/10 flex items-center justify-between">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
      <div className="font-mono text-[8px] uppercase tracking-widest opacity-40">{name} Dashboard</div>
      <div className="w-4 h-4 rounded bg-white/5" />
    </div>
    <div className="p-6 space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full", i === 0 ? `bg-${color}` : "bg-white/20")} />
          <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={cn("h-full", i === 0 ? `bg-${color}` : "bg-white/10")} 
            />
          </div>
          <div className="font-mono text-[8px] opacity-30">{item}</div>
        </div>
      ))}
      <div className="pt-4 grid grid-cols-2 gap-2">
        <div className="h-12 rounded-xl bg-white/5 border border-white/5" />
        <div className="h-12 rounded-xl bg-white/5 border border-white/5" />
      </div>
    </div>
  </div>
);

export const SlideRenderer = ({ slide }: { slide: SlideData }) => {
  return (
    <div className={cn(
      "grid gap-12 items-center flex-1",
      slide.type === "title" || slide.type === "proof" || slide.type === "problem" || slide.type === "schema" || slide.type === "verdict" || slide.type === "winner" || slide.type === "chapters" ? "lg:grid-cols-2" : "grid-cols-1"
    )}>
      
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h2 className="font-display font-black text-5xl lg:text-7xl uppercase leading-[0.9] tracking-tighter mb-8 text-balance">
          {slide.title}
        </h2>
        {slide.desc && (
          <p className={cn("text-xl leading-relaxed max-w-xl", slide.light ? "text-ink/70" : "text-white/70")}>
            {slide.desc}
          </p>
        )}
        {slide.tags && (
          <div className="flex gap-3 mt-8">
            {slide.tags.map(tag => <Badge key={tag} variant={tag === "Calendar booking" ? "accent" : "dark"}>{tag}</Badge>)}
          </div>
        )}
        
        {slide.steps && (
          <div className="mt-10 space-y-6">
             {slide.steps.map((step, i) => (
               <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-mono font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                     {step.n}
                  </div>
                  <div>
                     <h4 className="font-display text-2xl font-bold uppercase mb-1">{step.t}</h4>
                     <p className="text-sm opacity-60 leading-relaxed">{step.d}</p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative h-full flex flex-col justify-center"
      >
        {slide.type === "title" && slide.phoneCaption && <PhoneUI caption={slide.phoneCaption} />}
        
        {slide.panel && (
          <div className={cn(
            "p-10 rounded-[40px] relative overflow-hidden shadow-2xl",
            slide.light ? "bg-black text-white" : "bg-panel text-ink"
          )}>
            <div className="font-mono text-[10px] uppercase opacity-40 mb-4 tracking-widest">{slide.panel.kicker}</div>
            <h3 className="font-display text-5xl font-black uppercase mb-6 tracking-tight">{slide.panel.title}</h3>
            <p className="text-lg opacity-80 leading-relaxed mb-6">{slide.panel.desc}</p>
            {slide.panel.badge && <Badge variant="accent">{slide.panel.badge}</Badge>}
          </div>
        )}

        {slide.type === "chapters" && slide.id === "s05b" && (
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-1 h-32 items-center">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [20, Math.random() * 100 + 20, 20],
                    backgroundColor: i > 10 ? "#ff3b2e" : "#3b82f6"
                  }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                  className="w-2 rounded-full"
                />
              ))}
            </div>
            <Badge variant="accent">Angry Customer Stress Test</Badge>
          </div>
        )}

        {slide.type === "chapters" && slide.id === "s03b" && (
          <div className="relative">
            <PhoneUI caption="Test 1: Vapi" />
            <motion.div 
              initial={{ x: 20, y: 20, opacity: 0 }}
              whileInView={{ x: 40, y: 40, opacity: 1 }}
              className="absolute inset-0"
            >
              <PhoneUI caption="Test 2: Retell" />
            </motion.div>
          </div>
        )}

        {slide.type === "chapters" && slide.id === "s01b" && (
          <div className="grid grid-cols-2 gap-6 scale-90 -rotate-2">
            <UIMock name="Vapi" color="accent-blue" items={["IVR Node A", "IVR Node B", "TTS Custom"]} />
            <div className="translate-y-12 rotate-3">
              <UIMock name="Retell" color="accent" items={["Agent Start", "Webhook URL", "Voice ID"]} />
            </div>
          </div>
        )}

        {slide.cards && (slide.type !== "chapters" || !["s01b", "s03b", "s05b"].includes(slide.id)) && (
          <div className={cn("grid gap-4", slide.type === "chapters" ? "grid-cols-1" : "lg:grid-cols-2")}>
             {slide.cards.map((card, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 hover:border-accent/40 transition-all group">
                 <card.i className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                 <div>
                   <h4 className="font-display text-xl font-bold uppercase mb-1">{card.t}</h4>
                   <p className="text-xs opacity-60 leading-relaxed">{card.d}</p>
                 </div>
               </div>
             ))}
          </div>
        )}

        {slide.flowNodes && (
          <div className="flex flex-wrap gap-4 items-center justify-center">
             {slide.flowNodes.map((node, i) => (
               <React.Fragment key={i}>
                 <div className={cn(
                   "px-6 py-4 rounded-2xl font-mono text-xs uppercase font-black tracking-widest shadow-xl",
                   i === slide.flowNodes!.length - 1 ? "bg-accent text-white" : "bg-panel text-ink"
                 )}>
                   {node}
                 </div>
                 {i < slide.flowNodes!.length - 1 && <ArrowRight className="w-6 h-6 text-accent" />}
               </React.Fragment>
             ))}
          </div>
        )}

        {slide.diagram && (
          <div className="space-y-6">
             {slide.diagram.map((item, i) => (
               <div key={i} className="p-8 rounded-3xl bg-white border border-black/10 shadow-xl group border-l-8 border-l-accent">
                 <h4 className="font-display text-2xl font-bold uppercase mb-2 text-ink">{item.t}</h4>
                 <p className="text-sm text-ink/60 leading-relaxed">{item.d}</p>
               </div>
             ))}
          </div>
        )}

        {slide.schema && (
          <div className="p-8 rounded-[40px] bg-black text-white font-mono text-sm space-y-8 border border-white/10 shadow-2xl">
             <div>
               <div className="text-accent-orange text-[10px] font-bold uppercase mb-3 tracking-widest">Input Payload</div>
               <div className="grid grid-cols-2 gap-2 opacity-70">
                  {slide.schema.input.map(i => <div key={i} className="flex gap-2"><span>·</span> {i}</div>)}
               </div>
             </div>
             <div>
               <div className="text-accent-blue text-[10px] font-bold uppercase mb-3 tracking-widest">Output Payload</div>
               <div className="grid grid-cols-2 gap-2 opacity-70">
                  {slide.schema.output.map(o => <div key={o} className="flex gap-2"><span>·</span> {o}</div>)}
               </div>
             </div>
          </div>
        )}

        {slide.mega && (
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="font-display font-black text-[12vw] leading-none text-accent drop-shadow-[0_0_50px_rgba(255,59,46,0.3)]"
            >
              {slide.mega.n}
              <span className="text-[0.3em] font-normal ml-2">{slide.mega.s}</span>
            </motion.div>
            <div className="mt-8">
               <Badge variant="accent">Platform Performance</Badge>
            </div>
          </div>
        )}

        {slide.tableData && (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-white/5 font-mono text-[10px] uppercase tracking-widest border-b border-white/10">
                <tr>
                  {slide.tableData[0].map((h, i) => (
                    <th key={i} className={cn("p-5", i === 3 && "text-accent")}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {slide.tableData.slice(1).map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-bold uppercase tracking-tight">{row[0]}</td>
                    <td className="p-5 opacity-70">{row[1]}</td>
                    <td className="p-5 opacity-70">{row[2]}</td>
                    <td className="p-5 text-accent italic font-black uppercase text-[10px] tracking-widest">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {slide.type === "winner" && (
           <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 opacity-30 grayscale transition-all">
                    <Badge variant="dark">Vapi</Badge>
                    <h3 className="font-display text-3xl font-bold mt-4 uppercase">Builder's Choice</h3>
                    <p className="mt-4 text-sm opacity-60">Deep developer hooks.</p>
                 </div>
                 <div className="p-8 rounded-[40px] bg-accent text-white relative overflow-hidden shadow-[0_0_80px_rgba(255,59,46,0.5)]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-3xl rounded-full" />
                    <Badge variant="dark">Official Winner</Badge>
                    <h3 className="font-display text-4xl font-bold mt-4 uppercase leading-none">Retell AI</h3>
                    <p className="mt-4 text-sm opacity-90 font-medium">Native-feel conversation.</p>
                    <Trophy className="absolute bottom-6 right-6 w-16 h-16 opacity-30 rotate-12" />
                 </div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-full bg-panel text-ink border-4 border-ink font-mono font-black text-base uppercase tracking-widest shadow-2xl z-20">
                 Awarded To ↑
              </div>
           </div>
        )}
      </motion.div>
    </div>
  );
};
