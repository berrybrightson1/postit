'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { CheckCircle2, Heart, MessageCircle, Share2, Repeat2 } from 'lucide-react'

export const TwitterStyle = () => {
    const { headline, body, footer, primaryColor, textColor, backgroundColor, mainImage, aspectRatio, backdropPosition, logo, brandingLine1, brandingLine2, fontFamily, autoFontSize, userTier, templateId, templateStyles } = useStore()
    const bodySize = templateStyles[templateId]?.bodySize || 1

    const fontVariable = fontFamily === 'Inter' ? 'var(--font-inter)' :
        fontFamily === 'Playfair Display' ? 'var(--font-playfair)' :
            fontFamily === 'Space Grotesk' ? 'var(--font-space)' :
                fontFamily === 'Outfit' ? 'var(--font-outfit)' :
                    fontFamily === 'Bebas Neue' ? 'var(--font-bebas)' : 'inherit'

    const brandName = footer.includes('.') ? footer.split('.')[0] : footer
    const handle = footer.toLowerCase().replace(/\s+/g, '')

    return (
        <div
            id="capture-area"
            className={cn(
                "relative overflow-hidden shadow-2xl transition-all duration-500 flex items-center justify-center p-8 lg:p-12",
                aspectRatio === '1:1' ? "aspect-square w-full" :
                    aspectRatio === '9:16' ? "aspect-[9/16] w-full max-h-[85vh]" : "aspect-[4/5] w-full"
            )}
            style={{ backgroundColor }}
        >
            <div
                className="w-full bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col gap-4 max-w-lg"
                style={{ fontFamily: `${fontVariable}, sans-serif` }}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-black/5">
                            {logo ? (
                                <img src={logo} className="w-full h-full object-contain" alt="P" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary">
                                    <span className="text-white font-black">P</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-gray-900 leading-tight">{brandName}</span>
                                <CheckCircle2 size={14} className="text-primary fill-primary text-white" />
                            </div>
                            <span className="text-gray-500 text-sm leading-tight">@{handle}</span>
                        </div>
                    </div>
                    <img src="/logo/Asset 3.svg" className="h-4 w-auto opacity-20" alt="Logo" />
                </div>

                {/* Body */}
                <div className="bg-white p-4 transform -skew-x-6 border-l-8 border-[var(--primary)]" style={{ '--primary': primaryColor } as any}>
                    <p
                        className="text-black font-black uppercase leading-none transform skew-x-6"
                        style={{
                            fontSize: (autoFontSize && userTier === 'pro')
                                ? `${(body.length < 30 ? 2 : body.length < 60 ? 1.5 : 1.2) * bodySize}rem`
                                : `calc(1.5rem * ${bodySize})`
                        }}
                    >
                        {body}
                    </p>
                </div>

                {/* Main Content Image (Backdrop inside the "tweet") */}
                {mainImage && (
                    <div className="rounded-2xl overflow-hidden aspect-video border border-gray-100">
                        <img src={mainImage} className={cn("w-full h-full object-cover", backdropPosition)} alt="Tweet media" />
                    </div>
                )}

                {/* Stats / Time */}
                <div className="flex items-center gap-2 py-1 border-b border-gray-50 pb-3">
                    <span className="text-gray-500 text-sm">9:41 AM · Feb 2, 2026</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-900 font-bold text-sm">4.2M</span>
                    <span className="text-gray-500 text-sm">Views</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between text-gray-500 px-1 pt-1">
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                        <MessageCircle size={18} />
                        <span className="text-xs">1.2k</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer">
                        <Repeat2 size={18} />
                        <span className="text-xs">4.8k</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart size={18} />
                        <span className="text-xs">24k</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                        <Share2 size={18} />
                    </div>
                </div>
            </div>

            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10 blur-3xl pointer-events-none w-full h-full bg-[var(--primary)]" style={{ '--primary': primaryColor } as any} />
        </div>
    )
}
