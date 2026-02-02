'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Quote as QuoteIcon, Minus, User, Hash } from 'lucide-react'
import { fontWeightMap } from '@/lib/utils'

export const ViralQuote = () => {
    const { headline, body, footer, textColor, backgroundColor, primaryColor, mainImage, aspectRatio, backdropPosition, logo, brandingLine1, brandingLine2, templateId, templateStyles, fontFamily, autoFontSize, userTier } = useStore()

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.3
    const letterSpacing = style.letterSpacing || -0.02
    const weightKey = style.fontWeight || 'black'
    const fontWeight = fontWeightMap[weightKey]

    const fontVariable = fontFamily === 'Inter' ? 'var(--font-inter)' :
        fontFamily === 'Playfair Display' ? 'var(--font-playfair)' :
            fontFamily === 'Space Grotesk' ? 'var(--font-space)' :
                fontFamily === 'Outfit' ? 'var(--font-outfit)' :
                    fontFamily === 'Bebas Neue' ? 'var(--font-bebas)' : 'inherit'

    const variant = (templateId === 'ViralQuote' || templateId === 'Quote_1') ? 'ViralQuote' : templateId

    const sharedStyle = {
        fontFamily: `${fontVariable}, sans-serif`,
        color: textColor || '#FFFFFF',
    }

    if (variant === 'Quote_2') {
        return (
            <div className="w-full h-full flex flex-col p-16 font-sans bg-black relative overflow-hidden" style={sharedStyle}>
                <div className="absolute top-0 right-0 w-64 h-64 opacity-20 -mr-20 -mt-20 rounded-full" style={{ backgroundColor: primaryColor }} />
                <div className="relative z-10 flex flex-col h-full">
                    <QuoteIcon size={80} style={{ color: primaryColor }} className="mb-12" />
                    <p className="text-4xl font-bold italic translate-x-4 border-l-4 pl-8" style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.4em * ${bodySize})`, borderColor: primaryColor, fontWeight }}>{body}</p>
                    <div className="mt-auto flex items-center gap-4">
                        <Minus size={40} style={{ color: primaryColor }} />
                        <span className="text-2xl font-black uppercase tracking-tighter">{footer}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_3') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center font-sans bg-[#0c0c0c] relative overflow-hidden text-white" style={sharedStyle}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: primaryColor }} />
                <div className="relative z-10 flex flex-col items-center">
                    <Hash size={40} className="mb-8 opacity-40" />
                    <p className="text-5xl font-black tracking-tight leading-[0.9] mb-12 shadow-2xl" style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.3em * ${bodySize})`, fontWeight }}>{body}</p>
                    <span className="bg-white text-black px-4 py-1.5 rounded-full font-black uppercase text-sm">{footer}</span>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_4') {
        return (
            <div className="w-full h-full flex flex-col p-8 font-serif bg-white text-black border-[32px] border-gray-50 relative" style={sharedStyle}>
                <div className="flex-1 flex flex-col justify-center items-center text-center px-12">
                    <div className="w-12 h-1 bg-black mb-8" />
                    <p className="text-3xl italic leading-relaxed mb-8" style={{ fontWeight }}>"{body}"</p>
                    <div className="w-12 h-1 bg-black" />
                </div>
                <div className="mt-8 flex flex-col items-center gap-2">
                    <User size={20} className="opacity-20" />
                    <span className="text-sm font-black uppercase tracking-[0.4em]">{footer}</span>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_5') {
        return (
            <div className="w-full h-full flex flex-col font-sans bg-black p-8 relative overflow-hidden" style={sharedStyle}>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter break-words" style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(2em * ${bodySize})`, fontWeight }}>{body}</p>
                </div>
                <div className="mt-8 py-4 border-t-8 border-primary flex justify-between items-center" style={{ borderColor: primaryColor }}>
                    <span className="text-4xl font-black italic tracking-tighter">{footer}</span>
                </div>
            </div>
        )
    }

    // Default Quote_1 (Viral)
    return (
        <div className="w-full flex flex-col justify-center relative overflow-hidden font-sans p-8 lg:p-14 h-full" style={{ backgroundColor: backgroundColor || '#000000', ...sharedStyle }}>
            <div className="relative z-10 h-full flex flex-col min-h-[inherit]">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="absolute top-[-20px] left-[-10px] opacity-10 select-none z-0" style={{ color: primaryColor }} title="Decorative Quote Icon">
                        <QuoteIcon size={240} fill="currentColor" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-8 lg:gap-12">
                        <div className="flex flex-col gap-4">
                            <QuoteIcon size={48} className="rotate-180 drop-shadow-xl" style={{ color: primaryColor }} fill="currentColor" />
                            <p className="tracking-tight lg:leading-[0.85] max-w-full whitespace-pre-wrap transition-all duration-200" style={{
                                fontSize: (autoFontSize && userTier === 'pro')
                                    ? `${(body.length < 50 ? 5 : body.length < 100 ? 4 : 3) * bodySize}rem`
                                    : `${(body.length < 60 ? 4 : body.length < 120 ? 3 : body.length < 250 ? 2 : 1.5) * bodySize}rem`,
                                lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight
                            }}>
                                {body || 'Your viral quote here...'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-16 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: primaryColor }} />
                            <span className="font-black uppercase tracking-tighter leading-none" style={{ fontSize: `${(body.length < 60 ? 2.5 : 1.8) * bodySize}rem` }}>{footer || 'QUOTE OWNER'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
