'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { fontWeightMap, cn } from '@/lib/utils'

export const BreakingNews = () => {
    const { headline, body, footer, logo, primaryColor, textColor, backgroundColor, mainImage, backdropPosition, showWatermark, aspectRatio, brandingLine1, brandingLine2, templateId, templateStyles, fontFamily, textAlign, autoFontSize, userTier, showReadabilityGradient } = useStore()

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.4
    const letterSpacing = style.letterSpacing || 0
    const weightKey = style.fontWeight || 'bold'
    const fontWeight = fontWeightMap[weightKey]

    const variant = (templateId === 'BreakingNews' || templateId === 'News_1') ? 'BreakingNews' : templateId

    // Auto-scale font size for body text
    const bodyFontSize = useMemo(() => {
        const length = body.length || 0
        if (length < 80) return 'text-xl lg:text-3xl'
        if (length < 150) return 'text-lg lg:text-2xl'
        return 'text-base lg:text-xl'
    }, [body.length])

    const sharedStyle = {
        fontFamily: `'${fontFamily}', sans-serif`,
        color: textColor || '#FFF',
    }

    if (variant === 'News_2') {
        const accentColor = primaryColor || '#E11D48'
        return (
            <div className="w-full h-full flex flex-col relative overflow-hidden font-sans group" style={{ backgroundColor: backgroundColor || '#000', ...sharedStyle }}>
                {mainImage && (
                    <div className="absolute inset-0">
                        <img src={mainImage} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${backdropPosition}`} alt="" />
                        <div className={cn("absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300", showReadabilityGradient ? "opacity-100" : "opacity-80")} />
                        {showReadabilityGradient && <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300" />}
                    </div>
                )}

                {/* Modern Broadcast UI */}
                <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                    <div className="bg-red-600 px-3 py-1 rounded text-[10px] font-black tracking-widest text-white shadow-xl flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {brandingLine1 || 'LIVE'}
                    </div>
                    {logo && <img src={logo} className="h-8 w-auto object-contain brightness-0 invert" alt="" />}
                </div>

                <div className="mt-auto relative z-10 p-6 lg:p-10 w-full mb-4 lg:mb-8">
                    <div className="flex flex-col gap-0 max-w-full">
                        {/* Glassmorphism Title Plate */}
                        <div className="self-start px-5 py-2 relative overflow-hidden backdrop-blur-md bg-white/10 border-l-4 rounded-t-xl" style={{ borderLeftColor: accentColor }}>
                            <h1 className="text-xs lg:text-sm font-black tracking-[0.4em] uppercase italic text-white/70">{headline || 'BREAKING NEWS'}</h1>
                        </div>
                        {/* Glassmorphism Body Plate */}
                        <div className="backdrop-blur-xl bg-black/60 p-8 lg:p-12 border border-white/10 shadow-2xl rounded-b-3xl rounded-tr-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 select-none">
                                <div className="text-[120px] font-black italic tracking-tighter leading-none">{headline?.[0] || 'B'}</div>
                            </div>
                            <p
                                className="text-3xl lg:text-6xl font-black leading-[1.1] tracking-tighter whitespace-pre-wrap transition-all duration-300 drop-shadow-lg"
                                style={{
                                    textAlign,
                                    fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1em * ${bodySize})`,
                                    lineHeight,
                                    letterSpacing: `${letterSpacing}em`,
                                    fontWeight,
                                    color: '#FFFFFF'
                                }}
                            >
                                {body || 'The future is Bright, and it is absolutely Berry-tastic!'}
                            </p>
                        </div>
                        {/* Footer attribution for News_2 */}
                        {footer && (
                            <div className="self-end mt-2 px-4 py-1 bg-black/40 backdrop-blur rounded flex items-center gap-2 border border-white/5">
                                <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{footer}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative scanning line */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            </div>
        )
    }

    if (variant === 'News_3') {
        const accentColor = primaryColor || '#DC2626'
        return (
            <div className="w-full h-full flex flex-col relative overflow-hidden bg-black font-sans group" style={sharedStyle}>
                <div className="flex-1 relative overflow-hidden">
                    {mainImage && <img src={mainImage} className={`w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110 ${backdropPosition}`} alt="" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Live Badge */}
                    <div className="absolute top-8 left-8">
                        <div className="bg-red-600 px-4 py-2 font-black italic tracking-tighter shadow-xl text-white flex items-center gap-2 text-sm lg:text-base transform -skew-x-12">
                            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> {brandingLine1 || 'LIVE COVERAGE'}
                        </div>
                    </div>
                </div>

                {/* Stacked Ticker System */}
                <div className="flex flex-col relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

                    {/* Upper Bar: Category/Headline */}
                    <div className="h-14 lg:h-16 flex items-center px-8 relative overflow-hidden z-20" style={{ backgroundColor: accentColor }}>
                        <div className="flex items-center gap-4 relative z-10 w-full">
                            <div className="bg-black/20 px-3 py-1 rounded text-[10px] lg:text-xs font-black uppercase tracking-widest text-white/90 whitespace-nowrap">
                                {footer || 'BREAKING NEWS'}
                            </div>
                            <h2 className="text-xl lg:text-3xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                                {headline || 'BERRY WINS 2028 ELECTION'}
                            </h2>
                        </div>
                        {/* Decorative pattern on bar */}
                        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />
                    </div>

                    {/* Lower Bar: Scrolling Ticker */}
                    <div className="h-12 lg:h-14 bg-white flex items-center relative z-10 border-b-4 border-black">
                        <div className="bg-black text-white h-full flex items-center px-6 font-bold uppercase tracking-widest text-xs z-20 shrink-0 whitespace-nowrap">
                            {brandingLine2 || 'LATEST'}
                        </div>
                        <div className="flex-1 overflow-hidden flex items-center h-full relative">
                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

                            <div className="whitespace-nowrap flex items-center gap-16 px-4 animate-marquee text-black text-lg lg:text-xl">
                                <span className="font-bold uppercase tracking-tight" style={{ fontSize: `calc(1em * ${bodySize})` }}>{body || 'President Berry announces free smoothies for all citizens • Approval ratings skyrocket to 110% •'}</span>
                                <span className="font-bold uppercase tracking-tight" style={{ fontSize: `calc(1em * ${bodySize})` }}>{body || 'President Berry announces free smoothies for all citizens • Approval ratings skyrocket to 110% •'}</span>
                                <span className="font-bold uppercase tracking-tight" style={{ fontSize: `calc(1em * ${bodySize})` }}>{body || 'President Berry announces free smoothies for all citizens • Approval ratings skyrocket to 110% •'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'News_4') {
        const accentColor = primaryColor || '#E11D48'
        return (
            <div className="w-full h-full flex flex-col relative overflow-hidden font-sans p-2 lg:p-4" style={{ backgroundColor: backgroundColor || '#000', ...sharedStyle }}>
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[60%] h-full transform skew-x-[-15deg] translate-x-12 z-0" style={{ backgroundColor: accentColor }} />
                    {mainImage && <img src={mainImage} className={`absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay ${backdropPosition}`} alt="" />}
                </div>

                <div className="relative z-10 h-full flex flex-col p-10 lg:p-14 border-[12px] lg:border-[16px] border-white/10">
                    <div className="flex-1 flex flex-col justify-center gap-6 max-h-[70%] overflow-hidden text-4xl lg:text-7xl">
                        <div className="flex flex-col text-base">
                            <h1 className="text-xs lg:text-sm font-black tracking-[0.5em] text-white uppercase mb-2 bg-black self-start px-4 py-1">{headline || 'IMPACT'}</h1>
                            <div className="w-16 h-3 bg-white mb-4" style={{ backgroundColor: accentColor }} />
                        </div>

                        <p
                            className="font-black italic leading-[0.9] tracking-tighter uppercase break-words whitespace-pre-wrap transition-all duration-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                            style={{
                                textAlign,
                                color: '#FFFFFF',
                                fontWeight,
                                fontSize: `calc(1em * ${bodySize})`
                            }}
                        >
                            {body || 'BERRY\nGOOD\nNEWS'}
                        </p>
                    </div>

                    <div className="mt-auto flex justify-between items-end pt-12 border-t border-white/20">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 italic">{brandingLine1 || 'Authorized Source'}</span>
                            <span className="text-2xl font-black uppercase tracking-tight text-white">{footer || 'President Berry'}</span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-2 h-2 bg-white/20" />
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase text-white tracking-[0.4em] bg-red-600 px-3 py-1">{brandingLine2 || 'TOP PRIORITY'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'News_5') {
        const accentColor = primaryColor || '#E11D48'
        return (
            <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-0 relative overflow-hidden bg-black font-sans" style={sharedStyle}>
                {/* Main Image Plate (Takes most space) */}
                <div className="col-span-8 row-span-12 relative overflow-hidden border-r border-white/10 group">
                    {mainImage ? (
                        <img src={mainImage} className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${backdropPosition}`} alt="" />
                    ) : (
                        <div className="w-full h-full animate-pulse" style={{ backgroundColor: '#111' }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Floating Accent */}
                    <div className="absolute top-10 left-10 flex flex-col gap-2">
                        <div className="bg-red-600 text-white px-4 py-1.5 font-black italic text-xs lg:text-sm shadow-2xl skew-x-[-10deg]">{brandingLine1 || 'LIVE FEED'}</div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 lg:p-4 text-white uppercase font-black text-[8px] lg:text-[10px] tracking-widest skew-x-[-10deg]">
                            {brandingLine2 || 'POSTIT BROADCAST NETWORK'}
                        </div>
                    </div>
                </div>

                {/* Info Panel Plate */}
                <div className="col-span-4 row-span-12 flex flex-col bg-[#0c0c0c] border-l border-white/5">
                    {/* Header Strip */}
                    <div className="p-6 lg:p-10 flex flex-col gap-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                            <h1 className="text-[10px] lg:text-[12px] font-black tracking-[0.4em] uppercase text-white/50">{headline || 'REPORT'}</h1>
                        </div>
                        <div className="w-full h-[1px] bg-white/10" />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center">
                        <p
                            className="text-2xl lg:text-4xl font-black uppercase italic leading-tight tracking-tight text-white whitespace-pre-wrap transition-all duration-300"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(0.9em * ${bodySize})`,
                                fontWeight
                            }}
                        >
                            {body || 'The future is Bright, and it is absolutely Berry-tastic!'}
                        </p>
                        <div className="w-12 h-1 mt-8 mb-4" style={{ backgroundColor: accentColor }} />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest italic">{footer || 'PRESIDENT BERRY'}</span>
                    </div>

                    {/* Footer Stats/Meta Plate */}
                    <div className="mt-auto p-6 lg:p-10 border-t border-white/10 bg-black/50">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Status</span>
                                <span className="text-[10px] font-black text-white uppercase">Operational</span>
                            </div>
                            <div className="flex flex-col items-end text-right">
                                <span className="text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Region</span>
                                <span className="text-[10px] font-black text-white uppercase">Universal</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative scanning line overlap entire */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[length:100%_3px] bg-repeat-y" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, #fff 50%)' }} />
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
                            {showReadabilityGradient && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
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
                                    <h1 className="text-2xl lg:text-3xl font-black italic tracking-tighter uppercase relative z-10 leading-none text-white">{headline || 'BREAKING NEWS'}</h1>
                                    <div className="absolute top-0 right-[-15px] h-full w-[30px] transform skew-x-[20deg]" style={{ backgroundColor: primaryColor }} />
                                </div>
                            </div>
                        )}

                        <div className={`flex flex-col justify-center items-center ${aspectRatio === '1:1' ? 'text-center' : 'p-8 flex-1'}`} style={{ backgroundColor: aspectRatio !== '1:1' ? (backgroundColor ? (aspectRatio === '4:5' || aspectRatio === '9:16' ? backgroundColor : `${backgroundColor}99`) : '#000') : 'transparent' }}>
                            <p className={`${aspectRatio === '1:1' ? 'text-3xl lg:text-5xl leading-[0.95]' : bodyFontSize} tracking-tight transition-all duration-500 whitespace-pre-wrap`} style={{ textAlign, fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1em * ${bodySize})`, lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight }}>{body || 'The future is Bright, and it is absolutely Berry-tastic!'}</p>
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
