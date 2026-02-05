'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'

export const SportsScore = () => {
    const { headline, body, footer, primaryColor, textColor, backgroundColor, aspectRatio, brandingLine1, brandingLine2, fontFamily, textAlign, autoFontSize, userTier, templateId } = useStore()
    const bodySize = 1

    return (
        <div
            id="capture-area"
            className={cn(
                "relative overflow-hidden shadow-2xl transition-all duration-500",
                aspectRatio === '1:1' ? "aspect-square w-full" :
                    aspectRatio === '9:16' ? "aspect-[9/16] w-full max-h-[85vh]" : "aspect-[4/5] w-full"
            )}
            style={{
                backgroundColor,
                fontFamily: `'${fontFamily}', sans-serif`
            }}
        >
            {/* Main Image Backdrop */}
            <TemplateBackdrop overlayClassName="bg-gradient-to-t from-black via-black/40 to-transparent" className="opacity-60" />
            <TemplateLogo containerClassName="!top-10 !left-10" />

            {/* Sports Overlay Elements */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                {/* Accent Bar */}
                <div
                    className="h-2 w-24 mb-6"
                    style={{ backgroundColor: primaryColor }}
                />

                {/* Headline - Bold Slanted Style */}
                <h1
                    className="text-5xl font-black italic tracking-tighter uppercase leading-[0.8] mb-4 transform -skew-x-6"
                    style={{ color: primaryColor }}
                >
                    {headline || 'BERRY 2028'}
                </h1>

                {/* Body Content */}
                <div className="bg-white p-4 transform -skew-x-6 border-l-8" style={{ borderColor: primaryColor }}>
                    <p
                        className="text-black font-black uppercase leading-none transform skew-x-6 whitespace-pre-wrap"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro')
                                ? `${(body.length < 30 ? 2 : body.length < 60 ? 1.5 : 1.2) * bodySize}rem`
                                : `calc(1.5rem * ${bodySize})`
                        }}
                    >
                        {body || 'A Score For The People: Bright Future Guaranteed!'}
                    </p>
                </div>

                {/* Footer Branding Area */}
                <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4">
                    <div className="flex items-center gap-3">
                        <TemplateLogo className="h-8 w-auto object-contain" />
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 leading-none">{brandingLine1}</span>
                            <span className="text-[10px] font-black uppercase text-white leading-none">{brandingLine2 || footer}</span>
                        </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-6 opacity-40" style={{ backgroundColor: primaryColor }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Side Branding Label */}
            <div className="absolute top-8 right-0 bg-white px-3 py-1 transform origin-right rotate-90 translate-x-full">
                <span className="text-[10px] font-black tracking-widest text-black uppercase">{footer || 'President Berry'}</span>
            </div>
        </div>
    )
}
