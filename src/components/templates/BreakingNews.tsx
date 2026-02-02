'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { fontWeightMap } from '@/lib/utils'

export const BreakingNews = () => {
    const { headline, body, footer, logo, primaryColor, textColor, backgroundColor, mainImage, backdropPosition, showWatermark, aspectRatio, brandingLine1, brandingLine2, templateId, templateStyles, fontFamily, autoFontSize, userTier } = useStore()

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.4
    const letterSpacing = style.letterSpacing || 0
    const weightKey = style.fontWeight || 'bold'
    const fontWeight = fontWeightMap[weightKey]

    const fontVariable = fontFamily === 'Inter' ? 'var(--font-inter)' :
        fontFamily === 'Playfair Display' ? 'var(--font-playfair)' :
            fontFamily === 'Space Grotesk' ? 'var(--font-space)' :
                fontFamily === 'Outfit' ? 'var(--font-outfit)' :
                    fontFamily === 'Bebas Neue' ? 'var(--font-bebas)' : 'inherit'

    const variant = (templateId === 'BreakingNews' || templateId === 'News_1') ? 'BreakingNews' : templateId

    // Auto-scale font size for body text
    const bodyFontSize = useMemo(() => {
        const length = body.length || 0
        if (length < 80) return 'text-xl lg:text-3xl'
        if (length < 150) return 'text-lg lg:text-2xl'
        return 'text-base lg:text-xl'
    }, [body.length])

    const sharedStyle = {
        fontFamily: `${fontVariable}, sans-serif`,
        color: textColor || '#FFF',
    }

    if (variant === 'News_2') {
        return (
            <div className="w-full h-full flex flex-col relative overflow-hidden font-sans" style={{ backgroundColor: backgroundColor || '#000', ...sharedStyle }}>
                {mainImage && <img src={mainImage} className={`absolute inset-0 w-full h-full object-cover ${backdropPosition}`} alt="" />}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                        <h1 className="text-sm font-black tracking-[0.3em] uppercase mb-4 italic" style={{ color: primaryColor }}>{headline}</h1>
                        <p className="text-4xl font-bold leading-tight tracking-tight" style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.2em * ${bodySize})`, lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight }}>{body}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'News_3') {
        return (
            <div className="w-full h-full flex flex-col relative overflow-hidden bg-black font-sans" style={sharedStyle}>
                <div className="flex-1 relative">
                    {mainImage && <img src={mainImage} className={`w-full h-full object-cover opacity-80 ${backdropPosition}`} alt="" />}
                    <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 font-black italic tracking-tighter shadow-lg">LIVE</div>
                </div>
                <div className="h-24 flex items-center overflow-hidden border-t-4 border-white" style={{ backgroundColor: primaryColor }}>
                    <div className="whitespace-nowrap flex items-center gap-12 px-6 animate-marquee">
                        <span className="text-white text-3xl font-black uppercase italic tracking-tighter">{headline}: {body}</span>
                        <span className="text-white/40 text-3xl font-black select-none">•</span>
                        <span className="text-white text-3xl font-black uppercase italic tracking-tighter">{headline}: {body}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'News_4') {
        return (
            <div className="w-full h-full flex flex-col p-12 justify-center relative overflow-hidden" style={{ backgroundColor: backgroundColor || '#000', ...sharedStyle }}>
                <h1 className="text-[120px] font-black italic leading-[0.8] tracking-tighter opacity-10 absolute -top-4 -left-4 select-none whitespace-nowrap uppercase" style={{ color: primaryColor }}>{headline}</h1>
                <div className="relative z-10 translate-y-8">
                    <p className="text-6xl font-black italic uppercase leading-[0.9] tracking-tighter break-words" style={{ color: textColor || '#FFF', fontWeight }}>{body}</p>
                    <div className="h-6 w-32 mt-8" style={{ backgroundColor: primaryColor }} />
                    <p className="mt-4 text-sm font-bold tracking-[0.4em] uppercase opacity-60">{footer}</p>
                </div>
            </div>
        )
    }

    if (variant === 'News_5') {
        return (
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-gray-200" style={sharedStyle}>
                <div className="bg-white flex items-center justify-center p-6 text-center overflow-hidden">
                    <h1 className="text-4xl font-black italic tracking-tighter break-words leading-none" style={{ color: primaryColor }}>{headline}</h1>
                </div>
                <div className="relative overflow-hidden">
                    {mainImage ? <img src={mainImage} className={`w-full h-full object-cover ${backdropPosition}`} alt="" /> : <div className="w-full h-full" style={{ backgroundColor: primaryColor }} />}
                </div>
                <div className="bg-white p-6 justify-end flex flex-col">
                    <p className="text-lg font-bold leading-tight" style={{ color: textColor || '#000', fontWeight }}>{body}</p>
                </div>
                <div className="flex items-center justify-center p-4 bg-primary" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-black uppercase tracking-[0.2em] italic text-xs rotate-90 whitespace-nowrap">{footer}</span>
                </div>
            </div>
        )
    }

    // Default News_1 (Classic)
    return (
        <div className="w-full h-full flex flex-col relative overflow-hidden font-sans" style={{ backgroundColor: backgroundColor || '#000', ...sharedStyle }}>
            <div className="absolute inset-0 z-0">
                {(aspectRatio !== '1:1' && mainImage) ? (
                    <div className="w-full h-full">
                        <div className={(aspectRatio === '4:5' || aspectRatio === '9:16') ? 'h-1/2 w-full relative' : 'absolute inset-0'}>
                            <img src={mainImage} className={`w-full h-full object-cover ${backdropPosition || 'object-center'}`} alt="" />
                        </div>
                        {(aspectRatio === '4:5' || aspectRatio === '9:16') && <div className="h-1/2 w-full" style={{ backgroundColor: backgroundColor || '#FFFFFF' }} />}
                    </div>
                ) : <div className="w-full h-full" style={{ backgroundColor: backgroundColor || '#FFFFFF' }} />}
            </div>

            <div className="relative z-10 flex flex-col h-full w-full">
                <div className={`p-8 flex ${aspectRatio === '1:1' ? 'justify-center' : 'justify-between'} items-start w-full ${aspectRatio === '4:5' || aspectRatio === '9:16' ? 'h-1/2' : ''}`}>
                    <div className="flex flex-col items-center gap-2">
                        {logo ? <img src={logo} className="h-10 lg:h-14 w-auto object-contain drop-shadow-2xl" alt="" /> : <div className="text-3xl lg:text-4xl font-black italic tracking-tighter drop-shadow-2xl" style={{ color: primaryColor }}>POSTIT.</div>}
                    </div>
                    {aspectRatio !== '1:1' && (
                        <div className="bg-[#E11D48] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 font-black text-xs lg:text-sm tracking-widest shadow-2xl">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" /> LIVE
                        </div>
                    )}
                </div>

                <div className={`${(aspectRatio === '4:5' || aspectRatio === '9:16') ? 'h-1/2' : (aspectRatio === '1:1' ? 'flex-1 flex flex-col justify-center px-12' : 'mt-auto')} w-full z-10`}>
                    <div className={`flex flex-col items-stretch ${aspectRatio === '1:1' ? 'gap-8' : ''} h-full ${aspectRatio === '1:1' || aspectRatio === '4:5' || aspectRatio === '9:16' ? '' : 'rounded-[32px] overflow-hidden shadow-2xl border border-white/5'}`}>
                        {aspectRatio === '1:1' ? (
                            <div className="flex justify-center">
                                <div className="px-6 py-2 rounded-full shadow-2xl" style={{ backgroundColor: primaryColor }}>
                                    <span className="text-white text-sm font-black uppercase tracking-[0.3em] italic">{headline || 'BREAKING NEWS'}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 12, 4, 18, 5, 22].map((w, i) => (
                                            <div key={i} className="bg-white w-[1px] h-5" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-end self-start">
                                <div className="pl-8 pr-12 py-3 lg:py-4 relative z-20" style={{ backgroundColor: primaryColor }}>
                                    <h1 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase relative z-10 leading-none text-white">{headline}</h1>
                                    <div className="absolute top-0 right-[-15px] h-full w-[30px] transform skew-x-[20deg]" style={{ backgroundColor: primaryColor }} />
                                </div>
                            </div>
                        )}

                        <div className={`flex flex-col justify-center items-center ${aspectRatio === '1:1' ? 'text-center' : 'p-8 flex-1'}`} style={{ backgroundColor: aspectRatio !== '1:1' ? (backgroundColor ? (aspectRatio === '4:5' || aspectRatio === '9:16' ? backgroundColor : `${backgroundColor}99`) : '#000') : 'transparent' }}>
                            <p className={`${aspectRatio === '1:1' ? 'text-3xl lg:text-5xl leading-[0.95]' : bodyFontSize} tracking-tight transition-all duration-500`} style={{ fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1em * ${bodySize})`, lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight }}>{body}</p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 lg:py-6 flex justify-between items-center border-t border-black/5 mt-auto" style={{ backgroundColor: (aspectRatio === '1:1' || aspectRatio === '4:5' || aspectRatio === '9:16') ? '#FFFFFF' : (backgroundColor ? `${backgroundColor}CC` : 'rgba(255,255,255,0.9)') }}>
                    <span className="text-[12px] lg:text-lg font-black uppercase tracking-[0.2em]" style={{ color: primaryColor }}>{footer || 'Breaking News'}</span>
                    {showWatermark && (
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="text-[10px] lg:text-[11px] font-bold text-gray-400 leading-none lowercase">{brandingLine1}</span>
                            <span className="text-[11px] lg:text-[13px] font-black text-gray-900 leading-none tracking-tight">{brandingLine2}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
