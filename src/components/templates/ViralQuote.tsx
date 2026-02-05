'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Quote as QuoteIcon, Minus, User, Hash } from 'lucide-react'
import { fontWeightMap, cn } from '@/lib/utils'

import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'

export const ViralQuote = () => {
    const { headline, body, footer, email, textColor, backgroundColor, primaryColor, aspectRatio, brandingLine1, brandingLine2, templateId, templateStyles, fontFamily, textAlign, autoFontSize, userTier } = useStore()

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.3
    const letterSpacing = style.letterSpacing || -0.02
    const weightKey = style.fontWeight || 'black'
    const fontWeight = fontWeightMap[weightKey]

    const variant = (templateId === 'ViralQuote' || templateId === 'Quote_1') ? 'ViralQuote' : templateId

    const sharedStyle = {
        fontFamily: `'${fontFamily}', sans-serif`,
        color: textColor || '#FFFFFF',
    }


    if (variant === 'Quote_2') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden text-center" style={{ backgroundColor: backgroundColor || 'transparent', ...sharedStyle }}>
                <TemplateBackdrop overlayClassName="bg-black/40 backdrop-blur-[2px]" />
                <TemplateLogo containerClassName="!top-10 !left-10" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
                <div className="relative z-10 flex flex-col items-center max-w-2xl">
                    <div className="w-12 h-px mb-12 opacity-30" style={{ backgroundColor: primaryColor }} />
                    <QuoteIcon size={32} style={{ color: primaryColor }} className="mb-8 opacity-40" />
                    <p
                        className="tracking-tight leading-relaxed italic whitespace-pre-wrap transition-all duration-300"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.4em * ${bodySize})`,
                            fontWeight
                        }}
                    >
                        "{body || 'Your elegant quote here...'}"
                    </p>
                    <div className="w-12 h-px mt-12 mb-8 opacity-30" style={{ backgroundColor: primaryColor }} />
                    <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em] opacity-60">
                        {footer || 'SIGNATURE'}
                    </span>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_3') {
        return (
            <div className="w-full h-full flex flex-col justify-center p-12 lg:p-20 relative overflow-hidden" style={{ backgroundColor: backgroundColor || 'transparent', ...sharedStyle }}>
                <TemplateBackdrop overlayClassName="bg-black/40 backdrop-blur-[2px]" />
                <TemplateLogo containerClassName="!top-10 !left-10" />
                <div className="relative z-10 flex flex-col gap-12 max-w-2xl border-l-[6px] pl-10 lg:pl-16 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-300" style={{ borderColor: primaryColor }}>
                    <p
                        className="tracking-tighter leading-[1.1] whitespace-pre-wrap"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.8em * ${bodySize})`,
                            fontWeight
                        }}
                    >
                        {body || 'Your minimalist statement here...'}
                    </p>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Verified Statement</span>
                        <span className="text-[14px] lg:text-[18px] font-black uppercase tracking-tight">{footer || 'IDENTITY'}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_4') {
        const quoteColor = primaryColor || '#3B82F6'
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden" style={{ backgroundColor: backgroundColor || '#FFFFFF', ...sharedStyle }}>
                <TemplateBackdrop overlayClassName="bg-black/40 backdrop-blur-[2px]" />
                <TemplateLogo containerClassName="!top-10 !left-10" />
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: `${quoteColor}10` }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: `${quoteColor}10` }} />

                <div className="relative z-10 flex flex-col items-center gap-10 text-center w-full max-w-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-1 rounded-full" style={{ backgroundColor: quoteColor }} />
                        <div className="text-4xl lg:text-6xl text-gray-200 select-none font-serif opacity-30 leading-none">“</div>
                    </div>

                    <p
                        className="tracking-tight leading-snug whitespace-pre-wrap transition-all duration-300"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.6em * ${bodySize})`,
                            fontWeight,
                            color: textColor || '#111827'
                        }}
                    >
                        {body || 'The future isn’t just Bright, it’s absolutely Berry-tastic!'}
                    </p>

                    <div className="flex flex-col items-center gap-6 mt-4">
                        <div className="text-4xl lg:text-6xl text-gray-200 select-none font-serif opacity-30 leading-none rotate-180">“</div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="px-5 py-2 rounded-full border shadow-sm flex items-center gap-2.5 bg-white/10 backdrop-blur-sm" style={{ borderColor: `${quoteColor}20` }}>
                                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: quoteColor }} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: textColor || '#111827' }}>{footer || 'President Berry Brightson'}</span>
                            </div>
                            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{email || 'president@berry2028.gov'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_5') {
        return (
            <div className="w-full h-full flex flex-col font-sans relative overflow-hidden" style={{ backgroundColor: backgroundColor || 'transparent', ...sharedStyle }}>
                <TemplateBackdrop overlayClassName="bg-black/40 backdrop-blur-[2px]" />
                <TemplateLogo containerClassName="!top-10 !left-10" />
                <div className="absolute top-0 left-0 w-full h-3 lg:h-4 shadow-lg z-20" style={{ backgroundColor: primaryColor }} />
                <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-20 relative z-10">
                    <QuoteIcon size={40} className="mb-10 opacity-20 rotate-180" style={{ color: primaryColor }} />
                    <p
                        className="uppercase tracking-tighter leading-[1] whitespace-pre-wrap text-center max-w-2xl"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.8em * ${bodySize})`,
                            fontWeight: '900' // Force black for the bold version
                        }}
                    >
                        {body || 'BOLD STATEMENT'}
                    </p>
                </div>
                <div className="p-8 lg:p-12 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 leading-none mb-1">Source</span>
                        <span className="text-[18px] lg:text-[24px] font-black uppercase tracking-tighter leading-none">{footer || 'REPUTATION'}</span>
                    </div>
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-8 rounded-full opacity-30" style={{ backgroundColor: primaryColor }} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Default Quote_1 (Viral)
    return (
        <div className="w-full flex flex-col justify-center relative overflow-hidden font-sans p-8 lg:p-14 h-full" style={{ backgroundColor: backgroundColor || '#000000', ...sharedStyle }}>
            <TemplateBackdrop overlayClassName="bg-black/40 backdrop-blur-[2px]" />
            <TemplateLogo containerClassName="!top-10 !left-10" />
            <div className="relative z-10 h-full flex flex-col min-h-[inherit]">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="absolute top-[-20px] left-[-10px] opacity-10 select-none z-0" style={{ color: primaryColor }} title="Decorative Quote Icon">
                        <QuoteIcon size={240} fill="currentColor" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-8 lg:gap-12">
                        <div className="flex flex-col gap-4">
                            <QuoteIcon size={48} className="rotate-180 drop-shadow-xl" style={{ color: primaryColor }} fill="currentColor" />
                            <p className="tracking-tight lg:leading-[0.85] max-w-full whitespace-pre-wrap transition-all duration-200" style={{
                                textAlign,
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
                            <span className="font-black uppercase tracking-tighter leading-none" style={{ fontSize: `${(body.length < 60 ? 2.5 : 1.8)}rem` }}>{footer || 'QUOTE OWNER'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
