'use client'

import React, { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Palette, Layers, Pipette, Hash, Sparkles, ShieldCheck, ShieldAlert, Eye, EyeOff } from 'lucide-react'
import { cn, isMediaTemplate } from '@/lib/utils'
import { LockOverlay } from '@/components/common/LockOverlay'

// Sub-component for individual color control
const ColorControl = ({
    label,
    value,
    onChange,
    icon: Icon,
    recentColors,
    smartColors = [],
    userTier
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    icon: any;
    recentColors: string[];
    smartColors?: string[];
    userTier: 'free' | 'pro'
}) => {
    const [hexInput, setHexInput] = useState(value)
    const colorInputRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
        setHexInput(value)
    }, [value])

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setHexInput(val)
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            onChange(val)
        }
    }

    return (
        <div className="pill-container !p-3 gap-3">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Icon size={12} className="text-gray-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</label>
                </div>
                {/* ... Hex input kept same ... actually I should keep the hex input logic compact or I have to copy paste all of it. 
                I will leave the hex input logic as in the view_file. */}
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 relative group/hex">
                    <Hash size={10} className="text-gray-400" />
                    <input
                        type="text"
                        value={hexInput}
                        onChange={handleHexChange}
                        disabled={userTier === 'free'}
                        className={cn(
                            "text-base font-bold w-20 bg-transparent outline-none uppercase",
                            userTier === 'free' ? "text-gray-300" : "text-gray-700"
                        )}
                        aria-label="Hex color code"
                        title={userTier === 'free' ? "Pro Feature: Custom Hex" : "Enter Hex color code"}
                    />
                    {userTier === 'free' && (
                        <div className="absolute right-1 opacity-0 group-hover/hex:opacity-100 transition-opacity">
                            <Sparkles size={8} className="text-primary" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative group/picker">
                    <div
                        onClick={() => userTier === 'pro' && colorInputRef.current?.click()}
                        className={cn(
                            "w-12 h-10 rounded-xl border border-black/5 cursor-pointer shadow-inner relative transition-transform active:scale-95",
                            userTier === 'free' && "grayscale opacity-50 cursor-not-allowed"
                        )}
                        style={{ backgroundColor: value }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/picker:opacity-100 bg-black/10 transition-opacity rounded-xl">
                            {userTier === 'free' ? <Sparkles size={14} className="text-white ring-1 ring-white/20 rounded-full p-0.5" /> : <Pipette size={14} className="text-white drop-shadow-md" />}
                        </div>
                        <input
                            ref={colorInputRef}
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={userTier === 'free'}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            title={userTier === 'free' ? "Pro Feature: Color Picker" : "Choose color from picker"}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 flex-1 max-w-[180px]">
                    {/* Smart Colors from Image */}
                    {smartColors.map((c, i) => (
                        <button
                            key={`smart-${i}`}
                            onClick={() => onChange(c)}
                            className="w-5 h-5 rounded-full ring-2 ring-transparent ring-offset-1 hover:ring-gray-200 transition-all shadow-sm relative group/smart"
                            style={{ backgroundColor: c }}
                            title="Extracted from image"
                        >
                            <div className="absolute -top-1 -right-1 opacity-0 group-hover/smart:opacity-100 bg-white rounded-full p-0.5 shadow-sm">
                                <Sparkles size={6} className="text-yellow-500 fill-yellow-500" />
                            </div>
                        </button>
                    ))}

                    {/* Divider if smart colors exist */}
                    {smartColors.length > 0 && <div className="w-px h-5 bg-gray-200 mx-1" />}

                    {recentColors.slice(0, 12 - smartColors.length).map((c, i) => (
                        <button
                            key={`${c}-${i}`}
                            onClick={() => onChange(c)}
                            className={cn(
                                "w-5 h-5 rounded-full ring-1 ring-offset-2 transition-all",
                                value.toLowerCase() === c.toLowerCase() ? "ring-primary scale-110 shadow-sm" : "ring-transparent hover:ring-gray-200"
                            )}
                            style={{ backgroundColor: c }}
                            title={`Choose color ${c}`}
                            aria-label={`Select color ${c}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export const AestheticsSettings = () => {
    const {
        templateId,
        primaryColor,
        textColor,
        backgroundColor,
        showWatermark,
        recentBackgrounds,
        recentTexts,
        recentAccents,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        setShowWatermark,
        userTier,
        showReadabilityGradient, setShowReadabilityGradient,
        applyVibe,
        extractedColors
    } = useStore()

    return (
        <div className="flex flex-col gap-4">
            {/* Smart Vibe Presets */}
            <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Smart Vibes">
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <Sparkles size={12} className="text-gray-400" />
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Smart Vibes</label>
                        </div>
                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { name: 'Good News', color: 'bg-green-600', icon: '👍' },
                            { name: 'Bad News', color: 'bg-red-600', icon: '🚨' },
                            { name: 'Sad', color: 'bg-slate-500', icon: '😢' },
                            { name: 'Official', color: 'bg-blue-900', icon: '⚖️' },
                            { name: 'Meme', color: 'bg-yellow-400', icon: '🤪' },
                        ].map((vibe) => (
                            <button
                                key={vibe.name}
                                onClick={() => applyVibe(vibe.name)}
                                className="flex flex-col items-center gap-1 group"
                                title={`Apply ${vibe.name} Vibe`}
                                disabled={userTier === 'free'}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-transform active:scale-95 border-2 border-transparent group-hover:border-black/5",
                                    vibe.color,
                                    userTier === 'free' && "opacity-50 grayscale"
                                )}>
                                    {vibe.icon}
                                </div>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight group-hover:text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{vibe.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </LockOverlay>

            {/* Readability Toggle */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-lg transition-colors", showReadabilityGradient ? "bg-black text-white" : "bg-gray-200 text-gray-500")}>
                        {showReadabilityGradient ? <Eye size={14} /> : <EyeOff size={14} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700">Auto-Contrast</span>
                        <span className="text-[10px] text-gray-400 font-medium">Darkens background for text</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowReadabilityGradient(!showReadabilityGradient)}
                    className={cn(
                        "w-10 h-6 rounded-full relative transition-colors duration-200",
                        showReadabilityGradient ? "bg-black" : "bg-gray-200"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                        showReadabilityGradient ? "translate-x-4" : "translate-x-0"
                    )} />
                </button>
            </div>

            {/* Advanced Color System */}
            <ColorControl
                label="Background"
                value={backgroundColor}
                onChange={setBackgroundColor}
                icon={Layers}
                recentColors={recentBackgrounds}
                smartColors={extractedColors}
                userTier={userTier}
            />

            <ColorControl
                label="Text Color"
                value={textColor}
                onChange={setTextColor}
                icon={Palette}
                recentColors={recentTexts}
                smartColors={extractedColors}
                userTier={userTier}
            />

            <ColorControl
                label="Accent Color"
                value={primaryColor}
                onChange={setPrimaryColor}
                icon={Pipette}
                recentColors={recentAccents}
                smartColors={extractedColors}
                userTier={userTier}
            />

            {/* Watermark Container */}
            {isMediaTemplate(templateId) && (
                <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro to remove branding">
                    <div className="pill-container !flex-row !items-center !justify-between !p-4">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                showWatermark ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                            )}>
                                {showWatermark ? <ShieldCheck size={16} strokeWidth={3} /> : <ShieldAlert size={16} strokeWidth={3} />}
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-tight block">Official branding</span>
                                <p className="text-[9px] text-gray-500 font-medium">Add subtle POSTIT watermark</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowWatermark(!showWatermark)}
                            className={cn(
                                "w-10 h-5 rounded-full transition-all relative",
                                showWatermark ? "bg-primary" : "bg-gray-200"
                            )}
                            aria-label="Toggle Watermark"
                            title={showWatermark ? "Disable common watermark" : "Enable common watermark"}
                        >
                            <div className={cn(
                                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                showWatermark ? "right-1" : "left-1"
                            )} />
                        </button>
                    </div>
                </LockOverlay>
            )}
        </div>
    )
}
