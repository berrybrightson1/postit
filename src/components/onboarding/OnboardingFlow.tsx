'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, type TemplateId } from '@/lib/store'
import { ArrowRight, Check, Sparkles, Layout, Palette, Type, Newspaper, FileText, Quote, Trophy, Flame, Briefcase, Smile, Zap, MonitorPlay, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
    { id: 'purpose', title: "What are you creating?", icon: Layout },
    { id: 'vibe', title: "What's the vibe?", icon: Palette },
    { id: 'identity', title: "What's your brand?", icon: Type },
]

export const OnboardingFlow = () => {
    const [step, setStep] = useState(0)
    const [brandName, setBrandName] = useState('')
    const {
        setTemplateId,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        setBrandingLine1,
        setFooter,
        setHasOnboarded,
        setVibe,
        setTemplateAndReset
    } = useStore()

    const handlePurposeSelect = (templateId: TemplateId) => {
        // Use atomic setTemplateAndReset for clean state
        setTemplateAndReset(templateId)
        setStep(1)
    }

    const handleSkip = () => {
        // "Default page with the placeholder thing" -> News_6 (Berry President)
        setTemplateAndReset('News_6')
        setHasOnboarded(true)
    }

    const handleVibeSelect = (vibe: 'Serious' | 'Urgent' | 'Playful' | 'Minimal') => {
        // Apply Vibe Logic
        switch (vibe) {
            case 'Serious':
                setPrimaryColor('#0F172A') // Slate 900
                setBackgroundColor('#F8FAFC') // Slate 50
                setTextColor('#334155') // Slate 700
                break
            case 'Urgent':
                setPrimaryColor('#DC2626') // Red 600
                setBackgroundColor('#FEF2F2') // Red 50
                setTextColor('#111827') // Gray 900
                break
            case 'Playful':
                setPrimaryColor('#7C3AED') // Violet 600
                setBackgroundColor('#FFFBEB') // Amber 50
                setTextColor('#4C1D95') // Violet 900
                break
            case 'Minimal':
                setPrimaryColor('#000000')
                setBackgroundColor('#FFFFFF')
                setTextColor('#000000')
                break
        }
        setStep(2)
    }

    const handleIdentitySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!brandName.trim()) return

        setBrandingLine1(brandName.toUpperCase())
        setFooter(brandName.toUpperCase())
        setHasOnboarded(true)
    }

    return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 sm:p-8">
            <div className="max-w-xl w-full relative flex-1 flex flex-col justify-center">

                {/* Navigation Header */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-10 w-full pt-4 sm:pt-0">
                    {step > 0 ? (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="text-gray-400 hover:text-gray-900 font-bold text-sm px-4 py-2 hover:bg-gray-100 rounded-full transition-all flex items-center gap-2"
                        >
                            <ArrowRight className="rotate-180" size={16} />
                            Back
                        </button>
                    ) : (
                        <div /> /* Spacer */
                    )}

                    <button
                        onClick={handleSkip}
                        className="text-gray-400 hover:text-gray-900 font-bold text-sm px-4 py-2 hover:bg-gray-100 rounded-full transition-all"
                    >
                        Skip
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-10 text-center"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.6 }}
                                    className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl shadow-2xl shadow-blue-200 flex items-center justify-center mx-auto text-white mb-6 rotate-3"
                                >
                                    <Layout size={48} strokeWidth={2.5} />
                                </motion.div>
                                <div className="space-y-2">
                                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Start Fresh</h1>
                                    <p className="text-gray-500 font-medium text-xl">What are you creating today?</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'News_6', label: 'Breaking News', icon: Newspaper },
                                    { id: 'YouTubeThumbnail', label: 'YouTube Thumb', icon: MonitorPlay },
                                    { id: 'MagazineCover', label: 'Magazine Cover', icon: BookOpen },
                                    { id: 'Notice_1', label: 'Public Notice', icon: FileText },
                                    { id: 'Quote_1', label: 'Viral Quote', icon: Quote },
                                    { id: 'Quote_3', label: 'Church Quote', icon: Quote },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handlePurposeSelect(option.id as TemplateId)}
                                        className="py-6 px-6 rounded-3xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-left space-y-3 bg-white"
                                    >
                                        <option.icon
                                            size={40}
                                            strokeWidth={1.5}
                                            className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
                                        />
                                        <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-lg">{option.label}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-10 text-center"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.6 }}
                                    className="w-24 h-24 bg-gradient-to-bl from-pink-500 to-rose-500 rounded-3xl shadow-2xl shadow-rose-200 flex items-center justify-center mx-auto text-white mb-6 -rotate-3"
                                >
                                    <Palette size={48} strokeWidth={2.5} />
                                </motion.div>
                                <div className="space-y-2">
                                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Set the Vibe</h1>
                                    <p className="text-gray-500 font-medium text-xl">Choose a mood for your designs.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'Urgent', label: 'Urgent & Bold', color: '#DC2626', icon: Flame },
                                    { id: 'Serious', label: 'Professional Blue', color: '#0F172A', icon: Briefcase },
                                    { id: 'Playful', label: 'Playful & Fun', color: '#7C3AED', icon: Smile },
                                    { id: 'Minimal', label: 'Clean Minimalist', color: '#000000', icon: Sparkles },
                                ].map((vibez) => (
                                    <button
                                        key={vibez.id}
                                        onClick={() => handleVibeSelect(vibez.id as any)}
                                        className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-black/10 hover:shadow-lg transition-all group bg-white"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div
                                                className="w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center text-white"
                                                style={{ backgroundColor: vibez.color }}
                                            >
                                                <vibez.icon size={24} strokeWidth={2.5} />
                                            </div>
                                            <span className="font-bold text-xl text-gray-900">{vibez.label}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-gray-100 group-hover:border-black group-hover:bg-black group-hover:text-white text-white flex items-center justify-center transition-all">
                                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-10 text-center"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.6 }}
                                    className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl shadow-2xl shadow-orange-200 flex items-center justify-center mx-auto text-white mb-6 rotate-6"
                                >
                                    <Type size={48} strokeWidth={2.5} />
                                </motion.div>
                                <div className="space-y-2">
                                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Brand It</h1>
                                    <p className="text-gray-500 font-medium text-xl">What is your organization's name?</p>
                                </div>
                            </div>

                            <form onSubmit={handleIdentitySubmit} className="w-full max-w-sm mx-auto space-y-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        placeholder="e.g. Daily Bugle"
                                        className="w-full text-center text-3xl font-black placeholder:text-gray-200 border-b-4 border-gray-100 focus:border-black pb-4 focus:outline-none transition-colors bg-transparent"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!brandName.trim()}
                                    className="w-full py-5 bg-black text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/20 flex items-center justify-center gap-3"
                                >
                                    <Sparkles size={24} />
                                    Launch Studio
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-full max-w-xs mt-12 flex justify-center gap-3">
                {STEPS.map((s, i) => (
                    <div
                        key={s.id}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            i === step ? "w-8 bg-black" : i < step ? "w-8 bg-black/20" : "w-2 bg-gray-200"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
