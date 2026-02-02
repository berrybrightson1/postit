'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Bell, ShieldAlert, Zap, FileText, Dot } from 'lucide-react'
import { fontWeightMap } from '@/lib/utils'

export const PublicNotice = () => {
    const { body, footer, email, backgroundColor, textColor, primaryColor, aspectRatio, templateId, templateStyles, fontFamily, autoFontSize, userTier, logo } = useStore()

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.6
    const letterSpacing = style.letterSpacing || 0
    const weightKey = style.fontWeight || 'normal'
    const fontWeight = fontWeightMap[weightKey]

    const fontVariable = fontFamily === 'Inter' ? 'var(--font-inter)' :
        fontFamily === 'Playfair Display' ? 'var(--font-playfair)' :
            fontFamily === 'Space Grotesk' ? 'var(--font-space)' :
                fontFamily === 'Outfit' ? 'var(--font-outfit)' :
                    fontFamily === 'Bebas Neue' ? 'var(--font-bebas)' : 'inherit'

    const variant = (templateId === 'PublicNotice' || templateId === 'Notice_1') ? 'PublicNotice' : templateId

    const bodyFontSizeClass = useMemo(() => {
        const length = body.length || 0
        if (length < 100) return 'text-sm lg:text-base'
        if (length < 300) return 'text-xs lg:text-sm'
        return 'text-[10px] lg:text-xs'
    }, [body.length])

    const sharedStyle = {
        fontFamily: `${fontVariable}, sans-serif`,
        color: textColor || '#111827',
    }

    if (variant === 'Notice_2') {
        return (
            <div className="w-full h-full flex font-sans bg-white relative overflow-hidden" style={sharedStyle}>
                <div className="w-1/3 h-full p-8 flex flex-col justify-end gap-4 text-white" style={{ backgroundColor: primaryColor }}>
                    <ShieldAlert size={48} />
                    <h1 className="text-3xl font-black uppercase leading-none tracking-tighter">Public<br />Notice</h1>
                </div>
                <div className="flex-1 p-12 flex flex-col">
                    <div className="flex-1">
                        <p className="text-xl font-medium leading-relaxed" style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.1em * ${bodySize})`, fontWeight }}>{body}</p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact</span>
                        <span className="font-black text-sm">{footer}</span>
                        <span className="text-xs opacity-60 font-bold">{email}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Notice_3') {
        return (
            <div className="w-full h-full flex flex-col font-sans bg-white relative overflow-hidden" style={sharedStyle}>
                <div className="h-6 bg-hazard w-full" />
                <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                    <Zap size={64} className="mb-6" style={{ color: primaryColor }} />
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-8" style={{ color: primaryColor }}>Warning</h1>
                    <p className="text-2xl font-bold leading-tight max-w-2xl" style={{ fontWeight }}>{body}</p>
                </div>
                <div className="p-8 bg-gray-50 border-t flex justify-between items-center">
                    <span className="font-black tracking-widest uppercase text-xs opacity-40">{footer}</span>
                    <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                </div>
                <div className="h-6 bg-hazard w-full" />
            </div>
        )
    }

    if (variant === 'Notice_4') {
        return (
            <div className="w-full h-full flex flex-col font-serif bg-[#fdfbf6] p-16 items-center text-center border-[20px] border-white shadow-inner" style={sharedStyle}>
                <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-8" style={{ borderColor: primaryColor }}>
                    <FileText size={40} style={{ color: primaryColor }} />
                </div>
                <h1 className="text-sm font-bold tracking-[0.5em] uppercase mb-12 opacity-60">Legal Proclamation</h1>
                <div className="flex-1 flex items-center">
                    <p className="text-2xl italic leading-relaxed font-medium" style={{ fontWeight }}>"{body}"</p>
                </div>
                <div className="mt-auto w-full pt-12 flex flex-col items-center gap-4">
                    <div className="w-32 h-[1px]" style={{ backgroundColor: primaryColor }} />
                    <span className="text-xs font-bold tracking-widest uppercase">{footer}</span>
                </div>
            </div>
        )
    }

    if (variant === 'Notice_5') {
        return (
            <div className="w-full h-full flex flex-col font-sans bg-white relative overflow-hidden p-12" style={sharedStyle}>
                <div className="flex items-start gap-4 mb-12">
                    <div className="w-1 h-12" style={{ backgroundColor: primaryColor }} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Archive Ref #882</span>
                        <h1 className="text-xl font-black uppercase tracking-widest mt-1">Information Notice</h1>
                    </div>
                </div>
                <div className="flex-1 pl-5 border-l border-gray-100">
                    <p className="text-2xl font-light leading-snug" style={{ fontWeight }}>{body}</p>
                </div>
                <div className="mt-12 flex items-center gap-2">
                    <Dot size={32} style={{ color: primaryColor }} />
                    <span className="text-xs font-bold tracking-tight opacity-40">{footer} • {email}</span>
                </div>
            </div>
        )
    }

    // Default Notice_1 (Official)
    return (
        <div className="w-full flex flex-col p-8 lg:p-12 relative overflow-hidden font-sans bg-white h-full" style={sharedStyle}>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6 -ml-1">
                    <div className="shrink-0">
                        <Bell size={32} strokeWidth={2} style={{ color: primaryColor }} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[12px] lg:text-[14px] font-medium tracking-tight leading-none opacity-40">Public</span>
                        <h1 className="text-[18px] lg:text-[22px] font-black tracking-tighter leading-none mt-0.5 uppercase">Notice</h1>
                    </div>
                </div>

                <div className="flex-1 flex flex-col pt-8">
                    <p className={`${(autoFontSize && userTier === 'pro') ? bodyFontSizeClass : 'text-sm lg:text-base'} leading-tight whitespace-pre-wrap tracking-tight`} style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1em * ${bodySize})`, lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight }}>
                        {body || 'Your public announcement text goes here.'}
                    </p>
                </div>

                <div className="mt-auto w-full">
                    <div className="w-full h-[1px] mb-3 bg-primary" style={{ backgroundColor: primaryColor }} />
                    <div className="flex justify-between items-end gap-y-2">
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex gap-0.5">
                                {[1, 12, 4, 18, 5, 22].map((_, i) => (
                                    <div key={i} className="bg-white w-[1px] h-5" />
                                ))}
                            </div>
                            <span className="text-[7px] font-mono text-white/40">0 12345 67890 5</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[7px] lg:text-[8px] font-bold uppercase tracking-wider text-gray-400">Email</span>
                            <span className="text-[10px] lg:text-xs font-black mt-1">{email || 'hello@postit.app'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
