'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'

export const MagazineCover = () => {
    const { headline, body, footer, primaryColor, textColor, backgroundColor, aspectRatio, brandingLine1, brandingLine2, fontFamily, textAlign, autoFontSize, userTier, templateId, templateStyles } = useStore()
    const bodySize = templateStyles[templateId]?.bodySize || 1

    // Magazines usually have a main big title (Headline) and sub-headlines (Body)
    const subHeadlines = body.split('\n').filter(line => line.trim() !== '')

    return (
        <div
            id="capture-area"
            className={cn(
                "relative overflow-hidden shadow-2xl transition-all duration-500 bg-black flex items-center justify-center",
                aspectRatio === '1:1' ? "aspect-square w-full" :
                    aspectRatio === '16:9' ? "aspect-video w-full" :
                        aspectRatio === '9:16' ? "aspect-[9/16] w-full max-h-[85vh]" : "aspect-[4/5] w-full"
            )}
            style={{ fontFamily: `'${fontFamily}', sans-serif` }}
        >
            {/* Background Image - The "Cover Model" */}
            <TemplateBackdrop overlayClassName="bg-black/10" />
            <TemplateLogo containerClassName="!top-10 !right-10" />

            {/* Layout Container */}
            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between border-[20px] border-transparent">

                {/* Header: Large Branding */}
                <div className="flex flex-col items-center">
                    <h1
                        className="font-black uppercase tracking-tighter leading-[0.7] text-center w-full break-words"
                        style={{
                            color: primaryColor,
                            fontSize: (autoFontSize && userTier === 'pro')
                                ? `${(headline.length < 10 ? 6 : headline.length < 20 ? 4 : 3) * bodySize}rem`
                                : `calc(6rem * ${bodySize})`
                        }}
                    >
                        {headline}
                    </h1>
                    <div className="w-full h-px bg-white/30 mt-4" />
                    <div className="flex justify-between w-full mt-1">
                        <span className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{footer}</span>
                        <span className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">FEB 2026</span>
                    </div>
                </div>

                {/* Body: Editorial Snippets */}
                <div className="flex flex-col items-start gap-8 max-w-[60%]">
                    {subHeadlines.map((text, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <span
                                className="text-sm font-black uppercase tracking-[0.2em]"
                                style={{ color: primaryColor }}
                            >
                                Exclusive
                            </span>
                            <span
                                className="font-black text-white leading-none uppercase italic"
                                style={{
                                    textAlign,
                                    fontSize: (autoFontSize && userTier === 'pro')
                                        ? `${(text.length < 20 ? 1.5 : 1.25)}rem`
                                        : `1.5rem`
                                }}
                            >
                                {text}
                            </span>
                        </div>
                    ))}
                    {!subHeadlines.length && (
                        <span
                            className="font-black text-white leading-tight uppercase italic drop-shadow-lg"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro')
                                    ? `${(body.length < 50 ? 2.5 : 2)}rem`
                                    : `2.5rem`
                            }}
                        >
                            {body}
                        </span>
                    )}
                </div>

                {/* Footer: Details & Barcode Style */}
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">{brandingLine1}</span>
                        <span className="text-xs font-black text-white uppercase">{brandingLine2}</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-0.5">
                            {[1, 12, 4, 18, 5, 22].map((_, i) => (
                                <div key={i} className="bg-white w-[1px] h-5" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-white/40">0 12345 67890 5</span>
                    </div>
                </div>
            </div>

            {/* Price / Issue Label */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col items-end opacity-40">
                <span className="text-6xl font-black text-white transition-all">$9.99</span>
                <span className="text-xs font-bold text-white uppercase mt-[-10px] tracking-widest">Issue 042</span>
            </div>
        </div>
    )
}
