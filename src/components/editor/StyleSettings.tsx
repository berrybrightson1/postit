'use client'

import React, { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Square, Smartphone, ShieldCheck, ShieldAlert, Maximize2, Palette, Layers, Box, Pipette, Hash, Type, Sparkles, Lock } from 'lucide-react'
import { LockOverlay } from '@/components/common/LockOverlay'

// Sub-component for individual color control
const ColorControl = ({
    label,
    value,
    onChange,
    icon: Icon,
    recentColors,
    userTier
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    icon: any;
    recentColors: string[];
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
                    {recentColors.slice(0, 12).map((c, i) => (
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

export const StyleSettings = () => {
    const {
        templateId,
        primaryColor,
        textColor,
        backgroundColor,
        aspectRatio,
        showWatermark,
        recentBackgrounds,
        recentTexts,
        recentAccents,
        templateStyles,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        setAspectRatio,
        setShowWatermark,
        setBodySize,
        setLineHeight,
        setLetterSpacing,
        setFontWeight,
        fontFamily,
        setFontFamily,
        autoFontSize,
        setAutoFontSize,
        userTier
    } = useStore()

    const bodySize = templateStyles[templateId]?.bodySize || 1
    const lineHeight = templateStyles[templateId]?.lineHeight || 1.4
    const letterSpacing = templateStyles[templateId]?.letterSpacing || 0
    const fontWeight = templateStyles[templateId]?.fontWeight || 'bold'

    return (
        <div className="flex flex-col gap-4">
            {/* Aspect Ratio Container */}
            <div className="pill-container !p-3">
                <div className="flex items-center gap-2 mb-3 px-1">
                    <Box size={12} className="text-gray-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Canvas Proportions</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(['1:1', '4:5', '9:16'] as const)
                        .filter(ratio => templateId === 'PublicNotice' ? ratio !== '1:1' : true)
                        .map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black text-[9px] tracking-tight",
                                    aspectRatio === ratio ? "bg-primary text-white shadow-md ring-1 ring-primary" : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
                                )}
                                title={`Set aspect ratio to ${ratio}`}
                            >
                                {ratio === '1:1' && <Square size={12} strokeWidth={3} />}
                                {ratio === '4:5' && <Smartphone size={12} strokeWidth={3} className="rotate-90" />}
                                {ratio === '9:16' && <Smartphone size={12} strokeWidth={3} />}
                                {ratio}
                            </button>
                        ))}
                </div>
            </div>

            {/* Curated Style Presets */}
            <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Quick Themes">
                <div className="pill-container !p-3">
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <Sparkles size={12} className="text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quick Themes</label>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { name: 'Midnight', bg: '#0f172a', text: '#ffffff', accent: '#3b82f6' },
                            { name: 'Ember', bg: '#000000', text: '#ffffff', accent: '#ef4444' },
                            { name: 'Forest', bg: '#064e3b', text: '#ecfdf5', accent: '#10b981' },
                            { name: 'Royal', bg: '#4c1d95', text: '#ffffff', accent: '#fbbf24' },
                            { name: 'Clean', bg: '#ffffff', text: '#111827', accent: '#000000' },
                            { name: 'Slate', bg: '#334155', text: '#f8fafc', accent: '#cbd5e1' },
                            { name: 'Berry', bg: '#831843', text: '#fdf2f8', accent: '#f472b6' },
                            { name: 'Ocean', bg: '#164e63', text: '#ecfeff', accent: '#06b6d4' },
                        ].map((theme) => (
                            <button
                                key={theme.name}
                                onClick={() => {
                                    if (userTier === 'pro') {
                                        setBackgroundColor(theme.bg)
                                        setTextColor(theme.text)
                                        setPrimaryColor(theme.accent)
                                    }
                                }}
                                disabled={userTier === 'free'}
                                className="flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors group text-left disabled:opacity-50"
                                title={userTier === 'free' ? "Pro Feature: Themes" : `Apply ${theme.name} Theme`}
                            >
                                <div className="w-full h-8 rounded-md shadow-sm border border-black/5 flex overflow-hidden relative">
                                    <div className="w-2/3 h-full" style={{ backgroundColor: theme.bg }} />
                                    <div className="w-1/3 h-full" style={{ backgroundColor: theme.accent }} />
                                </div>
                                <span className="text-[8px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-tight pl-0.5">{theme.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </LockOverlay>

            {/* Advanced Color System */}
            <ColorControl
                label="Background"
                value={backgroundColor}
                onChange={setBackgroundColor}
                icon={Layers}
                recentColors={recentBackgrounds}
                userTier={userTier}
            />

            <ColorControl
                label="Text Color"
                value={textColor}
                onChange={setTextColor}
                icon={Palette}
                recentColors={recentTexts}
                userTier={userTier}
            />

            <ColorControl
                label="Accent Color"
                value={primaryColor}
                onChange={setPrimaryColor}
                icon={Pipette}
                recentColors={recentAccents}
                userTier={userTier}
            />

            {/* Typography Control - Recommended Editing Tool */}
            <div className="pill-container !p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Type size={12} className="text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Typography Scale</label>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {Math.round(bodySize * 100)}%
                    </span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={bodySize}
                    onChange={(e) => setBodySize(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                    title="Adjust text size"
                />
                <div className="flex justify-between mt-2 mb-6">
                    <span className="text-[8px] font-bold text-gray-300 uppercase">Small</span>
                    <span className="text-[8px] font-bold text-gray-300 uppercase">Large</span>
                </div>

                {/* Advanced Typography Controls */}
                <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
                    {/* Font Scale & Smart Fitting */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Font Scale</label>

                            {/* Smart Fitting Toggle - Pro Feature */}
                            <button
                                onClick={() => userTier === 'pro' && setAutoFontSize(!autoFontSize)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all",
                                    autoFontSize
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "bg-gray-50 text-gray-400 border border-gray-100"
                                )}
                                title={userTier === 'free' ? "Upgrade to Pro for Smart Fitting" : "Toggle Smart Text Fitting"}
                            >
                                <Sparkles size={10} className={cn(autoFontSize && "animate-pulse")} />
                                <span className="text-[9px] font-bold uppercase tracking-wide">Smart Fit</span>
                                {userTier === 'free' && <Lock size={8} className="ml-0.5" />}
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-gray-300">Manual Size</span>
                                <span className="text-[9px] font-bold text-gray-400">{bodySize.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={bodySize}
                                onChange={(e) => setBodySize(parseFloat(e.target.value))}
                                disabled={autoFontSize && userTier === 'pro'}
                                className={cn(
                                    "w-full h-1 rounded-lg appearance-none cursor-pointer accent-gray-400 hover:accent-primary",
                                    (autoFontSize && userTier === 'pro') ? "bg-gray-50 opacity-50 cursor-not-allowed" : "bg-gray-100"
                                )}
                                title="Adjust Font Size Scale"
                            />
                        </div>
                    </div>

                    {/* Line Height */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Line Height</label>
                            <span className="text-[9px] font-bold text-gray-400">{lineHeight}</span>
                        </div>
                        <input
                            type="range"
                            min="0.8"
                            max="2.0"
                            step="0.1"
                            value={lineHeight}
                            onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gray-400 hover:accent-primary"
                            title="Adjust Line Height"
                        />
                    </div>

                    {/* Letter Spacing */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Spacing</label>
                            <span className="text-[9px] font-bold text-gray-400">{letterSpacing}</span>
                        </div>
                        <input
                            type="range"
                            min="-0.05"
                            max="0.5"
                            step="0.01"
                            value={letterSpacing}
                            onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gray-400 hover:accent-primary"
                            title="Adjust Letter Spacing"
                        />
                    </div>

                    {/* Font Family - Pro Feature */}
                    <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Premium Fonts">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Premiun Fonts</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['Inter', 'Playfair Display', 'Space Grotesk', 'Outfit', 'Bebas Neue'] as const).map((font) => (
                                    <button
                                        key={font}
                                        onClick={() => setFontFamily(font)}
                                        className={cn(
                                            "py-2 px-3 text-[10px] font-bold rounded-lg border transition-all text-left truncate",
                                            fontFamily === font
                                                ? "bg-primary text-white border-primary shadow-sm"
                                                : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200 hover:text-gray-600"
                                        )}
                                        style={{ fontFamily: `'${font}', sans-serif` }}
                                    >
                                        {font}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </LockOverlay>

                    {/* Font Weight */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Weight</label>
                        <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100">
                            {(['normal', 'bold', 'black'] as const).map((w) => (
                                <button
                                    key={w}
                                    onClick={() => setFontWeight(w)}
                                    className={cn(
                                        "flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wide rounded-md transition-all",
                                        fontWeight === w ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Watermark Container - Hidden for Notice and Quote as requested */}
            {(templateId !== 'PublicNotice' && templateId !== 'ViralQuote') && (
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
