'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Type, Sparkles, Lock, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { LockOverlay } from '@/components/common/LockOverlay'
import { FontPicker } from './FontPicker'

export const TypographySettings = () => {
    const {
        templateId,
        templateStyles,
        setBodySize,
        setLineHeight,
        setLetterSpacing,
        setFontWeight,
        fontFamily,
        setFontFamily,
        autoFontSize,
        setAutoFontSize,
        textAlign,
        setTextAlign,
        userTier
    } = useStore()

    const bodySize = templateStyles[templateId]?.bodySize || 1
    const lineHeight = templateStyles[templateId]?.lineHeight || 1.4
    const letterSpacing = templateStyles[templateId]?.letterSpacing || 0
    const fontWeight = templateStyles[templateId]?.fontWeight || 'bold'

    return (
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

            {/* Advanced Typography Controls */}
            <div className="flex flex-col gap-4">
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

                {/* Font Family - Premium Feature */}
                <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Premium Fonts">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search Google Fonts</label>
                        <FontPicker
                            value={fontFamily}
                            onChange={setFontFamily}
                            userTier={userTier}
                        />
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

                {/* Text Alignment */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Alignment</label>
                    <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100">
                        {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                                key={align}
                                onClick={() => setTextAlign(align)}
                                className={cn(
                                    "flex-1 py-1.5 flex items-center justify-center rounded-md transition-all",
                                    textAlign === align ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-gray-400 hover:text-gray-600"
                                )}
                                title={`Align ${align}`}
                            >
                                {align === 'left' && <AlignLeft size={14} />}
                                {align === 'center' && <AlignCenter size={14} />}
                                {align === 'right' && <AlignRight size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
