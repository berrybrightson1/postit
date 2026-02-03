'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Bell, ShieldAlert, Zap, FileText, Dot } from 'lucide-react'
import { cn, fontWeightMap } from '@/lib/utils'

export const PublicNotice = () => {
    const { headline, body, footer, email, primaryColor, textColor, backgroundColor, mainImage, backdropPosition, templateId, templateStyles, fontFamily, textAlign, autoFontSize, userTier, logo } = useStore()
    const [logoPos, setLogoPos] = React.useState({ x: 50, y: 10 })

    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1
    const lineHeight = style.lineHeight || 1.6
    const letterSpacing = style.letterSpacing || 0
    const weightKey = style.fontWeight || 'normal'
    const fontWeight = fontWeightMap[weightKey]

    const variant = (templateId === 'PublicNotice' || templateId === 'Notice_1') ? 'PublicNotice' : templateId

    const bodyFontSizeClass = useMemo(() => {
        const length = body.length || 0
        if (length < 100) return 'text-sm lg:text-base'
        if (length < 300) return 'text-xs lg:text-sm'
        return 'text-[10px] lg:text-xs'
    }, [body.length])

    const sharedStyle = {
        fontFamily: `'${fontFamily}', sans-serif`,
        color: textColor || '#111827',
    }

    const renderLogo = () => {
        if (!logo) return null
        return (
            <div
                className="absolute z-[100] cursor-move p-2 group"
                style={{ left: `${logoPos.x}%`, top: `${logoPos.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                    if (!rect) return
                    const onMouseMove = (moveEvent: MouseEvent) => {
                        const x = ((moveEvent.clientX - rect.left) / rect.width) * 100
                        const y = ((moveEvent.clientY - rect.top) / rect.height) * 100
                        setLogoPos({
                            x: Math.max(0, Math.min(100, x)),
                            y: Math.max(0, Math.min(100, y))
                        })
                    }
                    const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove)
                        document.removeEventListener('mouseup', onMouseUp)
                    }
                    document.addEventListener('mousemove', onMouseMove)
                    document.addEventListener('mouseup', onMouseUp)
                }}
            >
                <img src={logo} className="h-12 w-auto object-contain drop-shadow-xl border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-all" alt="Logo" />
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">DRAG</div>
            </div>
        )
    }

    const backdropLayer = null

    if (variant === 'Notice_2') {
        return (
            <div className="w-full h-full flex flex-col font-sans bg-white relative overflow-hidden" style={sharedStyle}>
                {backdropLayer}
                {renderLogo()}
                <div className="h-2 w-full shadow-sm relative z-10" style={{ backgroundColor: primaryColor }} />
                <div className="flex-1 p-12 lg:p-16 flex flex-col gap-10 relative z-10">
                    <div className="flex items-center justify-between border-b pb-8" style={{ borderColor: `${primaryColor}20` }}>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Internal Ref: HQ-{Math.floor(Math.random() * 1000)}</span>
                            <h1 className="text-3xl font-black uppercase tracking-tight" style={{ color: primaryColor }}>{headline || 'Executive Order'}</h1>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100">
                            <Bell size={24} style={{ color: primaryColor }} />
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl">
                        <p
                            className="leading-relaxed whitespace-pre-wrap transition-all duration-300"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.1em * ${bodySize})`,
                                fontWeight
                            }}
                        >
                            {body || 'Berry Brightson’s first act as President? Replacing the traditional red tape with Berry-flavored fruit roll-ups!'}
                        </p>
                    </div>

                    <div className="mt-auto py-8 px-8 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Authorized By</span>
                            <span className="font-black text-sm tracking-tight">{footer || 'Berry Brightson Office'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact</span>
                            <span className="font-bold text-[10px] opacity-60">{email || 'president@berry2028.gov'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Notice_3') {
        return (
            <div className="w-full h-full flex flex-col font-sans relative overflow-hidden text-center" style={{ backgroundColor, ...sharedStyle }}>
                {backdropLayer}
                {renderLogo()}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(45deg, ${primaryColor} 25%, transparent 25%, transparent 50%, ${primaryColor} 50%, ${primaryColor} 75%, transparent 75%, transparent)`, backgroundSize: '40px 40px' }} />
                <div className="flex-1 p-12 lg:p-20 flex flex-col items-center justify-center relative z-10 gap-12">
                    <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-gray-200/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <Zap size={16} fill={primaryColor} stroke={primaryColor} className="animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{footer || 'PRESIDENTIAL ALERT'}</span>
                    </div>

                    <p
                        className="tracking-tighter leading-tight whitespace-pre-wrap max-w-3xl"
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.8em * ${bodySize})`,
                            fontWeight: '900'
                        }}
                    >
                        {body || 'Berry Brightson just signed a decree: All Monday mornings are now officially "Brightside" breaks!'}
                    </p>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-1 rounded-full opacity-30" style={{ backgroundColor: primaryColor }} />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{email || 'president@berry2028.gov'}</span>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Notice_4') {
        return (
            <div className="w-full h-full flex flex-col font-sans items-center justify-center p-12 lg:p-24 relative overflow-hidden" style={{ backgroundColor, ...sharedStyle }}>
                {backdropLayer}
                {renderLogo()}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
                    <FileText size={400} />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-16">
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.6em] opacity-40 border-b border-black/10 pb-4 mb-4">{headline || 'Presidential Proclamation'}</h2>
                        <p
                            className="tracking-tight leading-relaxed italic whitespace-pre-wrap transition-all duration-300"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.3em * ${bodySize})`,
                                fontWeight
                            }}
                        >
                            {body || 'Why did Berry Brightson run for President? He wanted to prove that you can be both a Bright leader and a Berry good friend!'}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-[120px] h-px bg-current opacity-20" />
                        <div className="flex flex-col gap-1 items-center">
                            <span className="text-[14px] font-black uppercase tracking-widest">{footer || 'THE OFFICE OF BERRY BRIGHTSON'}</span>
                            <span className="text-[10px] opacity-40 uppercase font-bold tracking-tight">{email || 'president@berry2028.gov'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Notice_5') {
        return (
            <div className="w-full h-full flex font-sans bg-white relative overflow-hidden" style={sharedStyle}>
                {backdropLayer}
                {renderLogo()}
                <div className="w-4 lg:w-6 h-full shadow-lg z-20" style={{ backgroundColor: primaryColor }} />
                <div className="flex-1 flex flex-col p-12 lg:p-16 relative z-10">
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-primary" style={{ color: primaryColor }}>
                                <ShieldAlert size={20} />
                                <span className="text-[12px] font-black uppercase tracking-[0.3em]">Attention Required</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.8]" style={{ color: primaryColor }}>{headline || 'PRESIDENT\nBERRY 2028'}</h1>
                        </div>
                        <div className="w-24 h-2 bg-black mb-4" style={{ backgroundColor: primaryColor }} />
                        <p
                            className="leading-tight whitespace-pre-wrap max-w-2xl transition-all duration-300"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.1em * ${bodySize})`,
                                fontWeight
                            }}
                        >
                            {body || 'Why did Berry Brightson become the President in 2028? Because he promised that the future would not only be Bright, but it would be absolutely Berry-tastic for everyone!'}
                        </p>
                    </div>

                    <div className="mt-12 flex justify-between items-end border-t border-gray-100 pt-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Authorized by</span>
                            <span className="font-black text-lg tracking-tight uppercase" style={{ color: primaryColor }}>{footer || 'The White House'}</span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Info</span>
                            <p className="font-bold text-sm">{email || 'president@berry2028.gov'}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Default Notice_1 (Official)
    return (
        <div className="w-full flex flex-col p-8 lg:p-12 relative overflow-hidden font-sans bg-white h-full" style={sharedStyle}>
            {backdropLayer}
            {renderLogo()}
            <div className="relative z-10 flex flex-col h-full bg-white/10 backdrop-blur-[2px]">
                <div className="flex items-center gap-3 mb-6 -ml-1">
                    <div className="shrink-0">
                        <Bell size={32} strokeWidth={2} style={{ color: primaryColor }} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[12px] lg:text-[14px] font-medium tracking-tight leading-none opacity-40">Public</span>
                        <h1 className="text-[18px] lg:text-[22px] font-black tracking-tighter leading-none mt-0.5 uppercase">{headline || 'Notice'}</h1>
                    </div>
                </div>

                <div className="flex-1 flex flex-col pt-8">
                    <p
                        className={`${(autoFontSize && userTier === 'pro') ? bodyFontSizeClass : 'text-sm lg:text-base'} leading-tight whitespace-pre-wrap tracking-tight transition-all duration-300`}
                        style={{
                            textAlign,
                            fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1em * ${bodySize})`,
                            lineHeight,
                            letterSpacing: `${letterSpacing}em`,
                            fontWeight
                        }}
                    >
                        {body || 'Your public announcement text goes here.'}
                    </p>
                </div>

                <div className="mt-auto w-full">
                    <div className="w-full h-[1px] mb-3 bg-primary" style={{ backgroundColor: primaryColor }} />
                    <div className="flex justify-between items-end gap-y-2">
                        <div className="flex flex-col items-end gap-1">
                            <i className="text-[8px] opacity-20 uppercase font-black tracking-tighter mb-1 select-none">Auth Code</i>
                            <div className="flex gap-0.5 opacity-20">
                                {[1, 12, 4, 18, 5, 22].map((_, i) => (
                                    <div key={i} className="bg-black w-[1px] h-5" />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[7px] lg:text-[8px] font-bold uppercase tracking-wider text-gray-400">Issued By</span>
                            <span className="text-[10px] lg:text-xs font-black mt-1 uppercase tracking-tight">{footer || 'Official Dept'}</span>
                            <span className="text-[10px] opacity-40 font-mono mt-0.5">{email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
