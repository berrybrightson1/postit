'use client'

import React, { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { Quote as QuoteIcon, Minus, User, Hash } from 'lucide-react'
import { fontWeightMap, cn } from '@/lib/utils'

import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'
import { DraggableElement } from '../canvas/DraggableElement'
import { EditableText } from '../canvas/EditableText'

export const ViralQuote = () => {
    const { headline, body, footer, email, textColor, backgroundColor, primaryColor, aspectRatio, brandingLine1, brandingLine2, templateId, templateStyles, fontFamily, textAlign, fontStyle, textDecoration, autoFontSize, userTier,
        setHeadline, setBody, setFooter
    } = useStore()

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
        fontStyle: fontStyle || 'normal',
        textDecoration: textDecoration || 'none'
    }



    if (variant === 'Quote_2') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden text-center" style={{ backgroundColor: backgroundColor || 'transparent', ...sharedStyle }}>
                {/* Backdrop and Logo removed as per request */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
                <div className="relative z-10 flex flex-col items-center max-w-2xl">
                    <div className="w-12 h-px mb-12 opacity-30" style={{ backgroundColor: primaryColor }} />
                    <QuoteIcon size={32} style={{ color: primaryColor }} className="mb-8 opacity-40" />
                    <DraggableElement id="body">
                        <EditableText
                            tagName="p"
                            value={body}
                            onChange={setBody}
                            className="tracking-tight leading-relaxed italic whitespace-pre-wrap transition-all duration-300 min-w-[200px]"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.4em * ${bodySize})`,
                                fontWeight,
                                fontStyle: (variant === 'Quote_2') ? 'italic' : fontStyle,
                                textDecoration
                            }}
                            placeholder="Your elegant quote here..."
                        />
                    </DraggableElement>
                    <div className="w-12 h-px mt-12 mb-8 opacity-30" style={{ backgroundColor: primaryColor }} />
                    <DraggableElement id="footer">
                        <EditableText
                            value={footer}
                            onChange={setFooter}
                            className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em] opacity-60 min-w-[100px]"
                            placeholder="SIGNATURE"
                        />
                    </DraggableElement>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_3') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden text-center" style={{ backgroundColor: backgroundColor || '#E5E7EB', ...sharedStyle }}>

                {/* Logo Placeholder or Actual Logo */}
                <div className="mb-6 relative group">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 mx-auto overflow-hidden">
                        <TemplateLogo
                            containerClassName="!static !inset-auto !translate-x-0 !translate-y-0 !w-full !h-full"
                            imageClassName="!object-cover"
                            placeholder={
                                <div className="flex items-center justify-center w-full h-full text-gray-400">
                                    <span className="text-4xl font-light">+</span>
                                </div>
                            }
                        />
                    </div>
                </div>

                {/* Church Name */}
                <DraggableElement id="headline">
                    <EditableText
                        tagName="h2"
                        value={headline}
                        onChange={setHeadline}
                        className="font-black uppercase tracking-tight mb-8 min-w-[200px]"
                        style={{ color: textColor || '#000000', fontSize: `calc(1.5rem * ${bodySize})`, fontFamily }}
                        placeholder="CHURCH NAME"
                    />
                </DraggableElement>

                {/* Main Quote */}
                <DraggableElement id="body" className="w-full">
                    <EditableText
                        tagName="p"
                        value={body}
                        onChange={setBody}
                        className="uppercase break-words w-full transition-all duration-300 leading-tight mb-12 min-w-[200px]"
                        style={{ color: textColor || '#000000', textAlign: 'center', fontSize: `calc(2.5rem * ${bodySize})`, fontWeight, lineHeight, letterSpacing: `${letterSpacing}em`, fontFamily, fontStyle, textDecoration }}
                        placeholder="LOREM IPSUM DOLOR SIT AMET..."
                    />
                </DraggableElement>

                {/* Pastor Name */}
                <div className="mt-auto">
                    <DraggableElement id="footer">
                        <EditableText
                            tagName="p"
                            value={footer}
                            onChange={setFooter}
                            className="uppercase tracking-wide opacity-80 min-w-[100px]"
                            style={{ color: textColor || '#000000', fontSize: `calc(1rem * ${bodySize})`, fontFamily }}
                            placeholder="PASTOR NAME:"
                        />
                    </DraggableElement>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_4') {
        const quoteColor = primaryColor || '#3B82F6'
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden" style={{ backgroundColor: backgroundColor || '#FFFFFF', ...sharedStyle }}>
                {/* Branding removed */}
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: `${quoteColor}10` }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: `${quoteColor}10` }} />

                <div className="relative z-10 flex flex-col items-center gap-10 text-center w-full max-w-2xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-1 rounded-full" style={{ backgroundColor: quoteColor }} />
                        <div className="text-4xl lg:text-6xl text-gray-200 select-none font-serif opacity-30 leading-none">“</div>
                    </div>

                    <DraggableElement id="body">
                        <EditableText
                            tagName="p"
                            value={body}
                            onChange={setBody}
                            className="tracking-tight leading-snug whitespace-pre-wrap transition-all duration-300 min-w-[200px]"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.6em * ${bodySize})`,
                                fontWeight,
                                color: textColor || '#111827',
                                fontStyle, textDecoration
                            }}
                            placeholder="The future isn't just Bright..."
                        />
                    </DraggableElement>

                    <div className="flex flex-col items-center gap-6 mt-4">
                        <div className="text-4xl lg:text-6xl text-gray-200 select-none font-serif opacity-30 leading-none rotate-180">“</div>

                        <DraggableElement id="footer" className="flex flex-col items-center gap-3">
                            <div className="px-5 py-2 rounded-full border shadow-sm flex items-center gap-2.5 bg-white/10 backdrop-blur-sm" style={{ borderColor: `${quoteColor}20` }}>
                                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: quoteColor }} />
                                <EditableText
                                    value={footer}
                                    onChange={setFooter}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] min-w-[50px]"
                                    style={{ color: textColor || '#111827' }}
                                    placeholder="President Berry Brightson"
                                />
                            </div>
                            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{email || 'president@berry2028.gov'}</span>
                        </DraggableElement>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'Quote_5') {
        return (
            <div className="w-full h-full flex flex-col font-sans relative overflow-hidden" style={{ backgroundColor: backgroundColor || 'transparent', ...sharedStyle }}>
                {/* Branding removed */}
                <div className="absolute top-0 left-0 w-full h-3 lg:h-4 shadow-lg z-20" style={{ backgroundColor: primaryColor }} />
                <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-20 relative z-10">
                    <QuoteIcon size={40} className="mb-10 opacity-20 rotate-180" style={{ color: primaryColor }} />
                    <DraggableElement id="body">
                        <EditableText
                            tagName="p"
                            value={body}
                            onChange={setBody}
                            className="uppercase tracking-tighter leading-[1] whitespace-pre-wrap text-center max-w-2xl min-w-[200px]"
                            style={{
                                textAlign,
                                fontSize: (autoFontSize && userTier === 'pro') ? undefined : `calc(1.8em * ${bodySize})`,
                                fontWeight,
                                fontStyle, textDecoration
                            }}
                            placeholder="BOLD STATEMENT"
                        />
                    </DraggableElement>
                </div>
                <div className="p-8 lg:p-12 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <DraggableElement id="footer" className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 leading-none mb-1">Source</span>
                        <EditableText
                            value={footer}
                            onChange={setFooter}
                            className="text-[18px] lg:text-[24px] font-black uppercase tracking-tighter leading-none min-w-[100px]"
                            placeholder="REPUTATION"
                        />
                    </DraggableElement>
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
            {/* Branding removed */}
            <div className="relative z-10 h-full flex flex-col min-h-[inherit]">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="absolute top-[-20px] left-[-10px] opacity-10 select-none z-0" style={{ color: primaryColor }} title="Decorative Quote Icon">
                        <QuoteIcon size={240} fill="currentColor" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-8 lg:gap-12">
                        <div className="flex flex-col gap-4">
                            <QuoteIcon size={48} className="rotate-180 drop-shadow-xl" style={{ color: primaryColor }} fill="currentColor" />
                            <DraggableElement id="body">
                                <EditableText
                                    tagName="p"
                                    value={body}
                                    onChange={setBody}
                                    className="tracking-tight lg:leading-[0.85] max-w-full whitespace-pre-wrap transition-all duration-200 min-w-[100px]"
                                    style={{
                                        textAlign,
                                        fontSize: (autoFontSize && userTier === 'pro')
                                            ? `${(body.length < 50 ? 5 : body.length < 100 ? 4 : 3) * bodySize}rem`
                                            : `${(body.length < 60 ? 4 : body.length < 120 ? 3 : body.length < 250 ? 2 : 1.5) * bodySize}rem`,
                                        lineHeight, letterSpacing: `${letterSpacing}em`, fontWeight
                                    }}
                                    placeholder="Your viral quote here..."
                                />
                            </DraggableElement>
                        </div>
                        <DraggableElement id="footer" className="flex flex-col gap-4">
                            <div className="w-16 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: primaryColor }} />
                            <EditableText
                                value={footer}
                                onChange={setFooter}
                                className="font-black uppercase tracking-tighter leading-none min-w-[100px]"
                                style={{ fontSize: `${(body.length < 60 ? 2.5 : 1.8)}rem` }}
                                placeholder="QUOTE OWNER"
                            />
                        </DraggableElement>
                    </div>
                </div>
            </div>
        </div>
    )
}
