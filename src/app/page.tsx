'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Share2, Layout, Smartphone, CheckCircle2, ChevronRight, MousePointer2, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const SmartCard = ({ children, className, delay, icon: Icon, title, value, color = "primary" }: { children?: React.ReactNode, className: string, delay: number, icon?: any, title?: string, value?: string, color?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      delay,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }}
    className={cn(
      "absolute z-30 bg-white/90 backdrop-blur-2xl border border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.06)] p-4 rounded-2xl pointer-events-none min-w-[220px]",
      className
    )}
  >
    <div className="flex items-center gap-3">
      {Icon && (
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
          color === 'primary' ? "bg-primary/10 text-primary" :
            color === 'blue' ? "bg-blue-500/10 text-blue-500" :
              "bg-green-500/10 text-green-500"
        )}>
          <Icon size={18} />
        </div>
      )}
      <div className="flex-1">
        {title && <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-0.5">{title}</p>}
        {value && <p className="text-[13px] font-black text-gray-900 tracking-tight">{value}</p>}
        {children}
      </div>
    </div>
  </motion.div>
)

const IpadMockup = ({ className, delay }: { className?: string, delay: number }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slides = [
    '/images/landing/localhost_3000_dashboard(Nest Hub Max) (1).png',
    '/images/landing/localhost_3000_dashboard(Nest Hub Max) (3).png',
    '/images/landing/localhost_3000_dashboard(Nest Hub Max) (5).png',
  ]

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative z-10 w-full max-w-[1200px] mx-auto drop-shadow-[0_40px_80px_rgba(206,17,38,0.15)] md:drop-shadow-[0_60px_120px_rgba(206,17,38,0.2)] flex flex-col items-center",
        className
      )}
    >
      {/* Premium Landscape Tablet Frame (CSS Built) */}
      <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-[2rem] md:rounded-[3.5rem] p-1.5 md:p-2 border-[1px] border-white/10 shadow-2xl overflow-hidden group">
        {/* Outer Bezel Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

        {/* Inner Screen Area */}
        <div className="absolute inset-[8px] md:inset-[12px] rounded-[1.6rem] md:rounded-[2.8rem] bg-black overflow-hidden border-[2px] md:border-[4px] border-[#0a0a0a]">
          {/* The Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-5 md:h-7 bg-black rounded-b-2xl md:rounded-b-3xl z-30 flex items-center justify-center gap-2 md:gap-3 border-x border-b border-white/5">
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
            <div className="w-8 md:w-12 h-1 bg-[#111] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
          </div>

          {/* Display Content */}
          <div className="w-full h-full relative z-10">
            <AnimatePresence>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide]}
                alt={`Dashboard View ${currentSlide + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
            </AnimatePresence>
          </div>

          {/* Screen Reflections */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="flex gap-3 mt-8 md:mt-12 bg-white/50 backdrop-blur-xl px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-black/5 shadow-premium">
        {slides.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 md:h-1.5 rounded-full transition-all duration-700 ease-out",
              currentSlide === i ? "w-8 md:w-10 bg-primary shadow-[0_0_10px_rgba(206,17,38,0.3)]" : "w-1 md:w-1.5 bg-gray-300"
            )}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8FF] selection:bg-primary/10 selection:text-primary overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-black/5 px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-2">
            <img src="/logo/Asset 3.svg" alt="Postit Logo" className="h-7 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Feature', 'Library', 'Support'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="px-6 py-3 bg-primary text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
          >
            Open App
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      <main className="pb-24 md:pb-0">
        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-6 left-6 right-6 z-[90] md:hidden">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-between bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl shadow-primary/30 font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
          >
            Create Your First Design
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-0 overflow-visible">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-[90px] font-black text-gray-900 tracking-tight leading-[1.1] md:leading-[1] max-w-5xl"
            >
              Intelligent Designs for <br />
              an <span className="text-primary">Instant</span> Future
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-10 text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed"
            >
              Experience ultimate speed, convenience, and control with our smart social media design solutions.
            </motion.p>

            {/* Mobile Smart Cards Grid */}
            <div className="grid grid-cols-2 gap-3 mt-12 w-full md:hidden">
              {[
                { icon: Zap, title: "Smart", value: "Auto-Fit Text" },
                { icon: Activity, title: "Exports", value: "128k Shares" },
                { icon: Layout, title: "Pro", value: "24 Styles" },
                { icon: Share2, title: "Ready", value: "Direct Post" }
              ].map((card, i) => (
                <div key={i} className="bg-white border border-black/5 p-4 rounded-2xl shadow-sm flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                    <card.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">{card.title}</p>
                    <p className="text-[11px] font-black text-gray-900">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Mockup Hero Area */}
          <div className="mt-12 md:mt-24 relative max-w-[1400px] mx-auto min-h-[300px] md:min-h-[600px] flex items-center justify-center pt-10 md:pt-20">
            {/* Background Orbits */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute flex items-center justify-center opacity-40 shadow-[0_0_100px_rgba(206,17,38,0.05)]"
              >
                <div className="w-[800px] md:w-[1500px] h-[800px] md:h-[1500px] rounded-full border border-primary/20" />
                <div className="absolute w-[600px] md:w-[1200px] h-[600px] md:h-[1200px] rounded-full border border-primary/15" />
                <div className="absolute w-[400px] md:w-[900px] h-[400px] md:h-[900px] rounded-full border border-primary/10" />

                {/* Decorative Dots on orbit */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(206,17,38,0.5)]" />
                <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
              </motion.div>
            </div>

            {/* Desktop-only Absolute Smart Cards */}
            <div className="hidden md:contents">
              <SmartCard
                className="top-[-10%] left-[-5%]"
                delay={0.6}
                icon={Zap}
                title="Automatically"
                value="Scale Text for iOS"
                color="primary"
              >
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-gray-400">Status: Active</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </SmartCard>

              <SmartCard
                className="top-[-10%] right-[-5%] hidden lg:block"
                delay={0.8}
                icon={Activity}
                title="Total Exports"
                value="128.45k Shares"
                color="blue"
              >
                <div className="mt-2 flex items-center gap-1.5 pointer-events-none">
                  <div className="flex gap-0.5 items-end h-5">
                    {[4, 7, 5, 9, 6].map((h, i) => (
                      <div key={i} className="w-1 bg-blue-500 rounded-full h-[var(--bar-height)]" style={{ '--bar-height': `${h * 2}px` } as any} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-blue-500">This week ↑</span>
                </div>
              </SmartCard>

              <SmartCard
                className="bottom-[5%] left-[-8%] hidden xl:block"
                delay={1}
                icon={Layout}
                title="Pro Templates"
                value="24 Active Styles"
                color="primary"
              >
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200" />)}
                  </div>
                  <span className="text-[9px] font-bold text-gray-400">+12 newest</span>
                </div>
              </SmartCard>

              <SmartCard
                className="bottom-[0%] right-[-5%] min-w-[200px] hidden lg:block"
                delay={0.7}
                icon={Share2}
                title="Direct Share"
                value="X & Instagram"
                color="green"
              >
                <div className="mt-2 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Post Ready</span>
                </div>
              </SmartCard>
            </div>

            {/* Centered Tablet Mockup */}
            <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12">
              <IpadMockup
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="feature" className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight uppercase">Seamless Workflow <br className="hidden md:block" /> for Modern Creators</h2>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-medium">
                Postit integrates directly into your creative process, ensuring every design is pixel-perfect and ready for any social platform in seconds.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 pt-4">
                {[
                  { title: "Smart Text Fitting", desc: "Our engine automatically adjusts your copy to fit any aspect ratio." },
                  { title: "One-Click Export", desc: "Directly share your creations to your favorite social platforms." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 md:p-0 bg-gray-50 md:bg-transparent rounded-2xl border border-black/[0.03] md:border-none">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h4>
                      <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] pt-4 md:pt-8 group"
              >
                Enter the design studio
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative group mt-8 md:mt-0">
              <div className="bg-gray-50 p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-sm border border-black/5 relative z-10 overflow-hidden group-hover:shadow-2xl transition-all duration-700">
                <div className="space-y-4 md:space-y-6 opacity-40">
                  <div className="flex items-center justify-between pb-4 border-b border-black/5">
                    <span className="font-black uppercase tracking-widest text-[8px] md:text-[9px] text-gray-400">System Logs</span>
                    <span className="bg-green-500/10 text-green-600 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase">Active</span>
                  </div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/[0.02]">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/5" />
                      <div className="flex-1">
                        <div className="h-1.5 md:h-2 w-24 md:w-32 bg-gray-100 rounded-full mb-2" />
                        <div className="h-1 w-16 md:w-24 bg-gray-50 rounded-full" />
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500/50" />
                    </div>
                  ))}
                </div>
                {/* Floating Mouse Cursor for Interaction Feel */}
                <motion.div
                  animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 z-20 text-primary drop-shadow-xl"
                >
                  <MousePointer2 className="w-6 h-6 md:w-8 md:h-8" />
                </motion.div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 md:w-64 h-48 md:h-64 bg-primary/5 blur-3xl -z-10" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 md:py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <img src="/logo/Asset 3.svg" alt="Postit Logo" className="h-6 w-auto opacity-20 mb-10 md:mb-12" />
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 md:mb-12">
            {['Privacy', 'Terms', 'Support', 'API'].map(i => (
              <a key={i} className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors pointer-events-none">{i}</a>
            ))}
          </div>
          <div className="w-full max-w-[200px] h-px bg-black/5 mb-8 md:hidden" />
          <p className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center">© 2026 POSTIT STUDIO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}
