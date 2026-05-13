import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  History, 
  Mic2, 
  Layout, 
  Maximize2,
  ChevronUp,
  ChevronDown,
  MonitorOff
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SLIDES } from "@/src/data/slides";
import { SlideRenderer } from "@/src/components/SlideRenderer";

// --- Internal Components ---

const SlideFrame = ({ children, light = false, slideNum }: any) => (
  <div className={cn(
    "relative w-full max-w-[1580px] h-[min(86vh,888px)] rounded-[40px] p-8 lg:p-14 overflow-hidden border transition-all duration-700",
    light ? "bg-panel text-ink border-black/10 shadow-2xl" : "bg-black/60 text-white border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
  )}>
    {/* Decorative Elements */}
    <div className="absolute inset-4 border border-current opacity-[0.08] rounded-[28px] pointer-events-none" 
         style={{ clipPath: 'polygon(0 0, 31% 0, 34% 7%, 62% 7%, 65% 0, 100% 0, 100% 100%, 70% 100%, 67% 93%, 35% 93%, 32% 100%, 0 100%)' }} />
    
    <div className={cn("absolute z-10 opacity-60 pointer-events-none", light ? "text-ink" : "text-white")}>
      <span className="absolute top-10 left-6 font-mono text-[10px] tracking-[0.2em] uppercase -rotate-90 origin-left whitespace-nowrap font-bold">
        AI CALLING SYSTEM
      </span>
      <span className="absolute bottom-10 right-6 font-mono text-[10px] tracking-[0.2em] uppercase rotate-90 origin-right whitespace-nowrap font-bold">
        VAPI VS RETELL
      </span>
    </div>

    <div className="absolute top-10 right-14 flex flex-col items-end gap-3 font-mono text-xs opacity-60">
      <span className="font-bold tracking-widest">{slideNum} / {SLIDES.length}</span>
      <div className="h-5 w-24 bg-current opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 8px, transparent 8px 13px)' }} />
    </div>

    <div className="relative h-full z-20 flex flex-col">
      {children}
    </div>
  </div>
);

const SpeakerNotes = ({ say, screen, visible }: { say: string, screen: string, visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-10 left-12 right-12 grid grid-cols-1 md:grid-cols-2 gap-6 z-[100]"
      >
        <div className="glass-effect p-8 rounded-[32px] border-white/20 shadow-2xl group hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent font-black uppercase tracking-[0.2em]">Live Script</span>
          </div>
          <p className="text-lg text-white leading-relaxed font-medium italic">"{say}"</p>
        </div>
        <div className="glass-effect p-8 rounded-[32px] border-white/20 shadow-2xl group hover:border-accent-blue/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="font-mono text-xs text-accent-blue font-black uppercase tracking-[0.2em]">Screen Context</span>
          </div>
          <p className="text-base text-white/70 leading-relaxed font-medium italic">{screen}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setActiveSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setActiveSlide(prev => Math.max(prev - 1, 0));
      }
      if (e.key.toLowerCase() === 'n') {
        setShowNotes(prev => !prev);
      }
      if (e.key === 'f') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const slide = containerRef.current?.children[activeSlide] as HTMLElement;
    slide?.scrollIntoView({ behavior: "smooth" });
  }, [activeSlide]);

  return (
    <div className="relative min-h-screen bg-bg selection:bg-accent selection:text-white overflow-hidden font-sans">
      {/* HUD Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-orange/5 blur-[150px] rounded-full" />
      </div>

      {/* Persistence Info Overlay */}
      <div className="fixed top-8 left-12 z-[100] flex items-center gap-6 pointer-events-none opacity-40">
        <div className="flex flex-col">
          <span className="font-mono text-[8px] uppercase tracking-widest font-black text-accent-blue">Session ID: RAIN-540-X</span>
          <span className="font-mono text-[8px] uppercase tracking-widest font-black text-white/50">Status: Recording Mode</span>
        </div>
      </div>

      {/* Global Controls Overlay */}
      <div className="fixed bottom-10 right-12 z-[110] flex items-center gap-4">
        <div className="glass-effect px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-black text-white/50 border border-white/20 whitespace-nowrap">
          Slide {String(activeSlide + 1).padStart(2, '0')} / {SLIDES.length}
        </div>
        <div className="flex gap-3">
          <button 
            title="Toggle Notes (N)"
            onClick={() => setShowNotes(prev => !prev)}
            className={cn(
              "p-4 rounded-full transition-all border border-white/10",
              showNotes ? "bg-accent-blue text-black border-transparent" : "text-white/50 hover:bg-white/10"
            )}
          >
            <MonitorOff className="w-5 h-5" />
          </button>
          <button 
            title="Fullscreen (F)"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            className="p-4 rounded-full hover:bg-white/10 transition-all border border-white/10 text-white/50"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 transition-all"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveSlide(prev => Math.min(SLIDES.length - 1, prev + 1))}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 transition-all"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 snap-container overflow-x-hidden">
        {SLIDES.map((slide, idx) => (
          <section key={slide.id} className="snap-slide flex items-center justify-center p-6 lg:p-10">
            <SlideFrame light={slide.light} slideNum={String(idx + 1).padStart(2, '0')}>
              
              {/* Ghost Label */}
              {slide.ghost && (
                <div className="absolute bottom-12 right-12 font-display text-[15vw] font-black opacity-[0.02] pointer-events-none uppercase leading-none select-none tracking-tighter">
                  {slide.ghost}
                </div>
              )}

              <SlideRenderer slide={slide} />
              
              {/* Footer Meta */}
              <div className="mt-auto pt-10 border-t border-current opacity-[0.1] flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.2em] font-black">
                <div className="flex gap-6">
                  <span>Deck.v2.5.0</span>
                  <span className="text-accent underline">Encrypted Connection</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
                  <span>Stream Ready</span>
                </div>
              </div>

            </SlideFrame>
          </section>
        ))}
      </div>

      <SpeakerNotes 
        say={SLIDES[activeSlide].say} 
        screen={SLIDES[activeSlide].screen} 
        visible={showNotes} 
      />
    </div>
  );
}
