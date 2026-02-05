'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import { Type, AlignLeft, Info, AtSign } from 'lucide-react'

export const TextInputs = () => {
    const { templateId, headline, setHeadline, body, setBody, footer, setFooter, email, setEmail, setMainImage, brandingLine1, setBrandingLine1, brandingLine2, setBrandingLine2 } = useStore()

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile()
                if (blob) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                        const result = event.target?.result as string
                        setMainImage(result)
                        toast.success('Image pasted from clipboard!')
                    }
                    reader.readAsDataURL(blob)
                }
                return // Stop if we found an image
            }
        }
    }

    // Helper for template-specific labels and visibility
    const config = {
        BreakingNews: {
            showHeadline: true,
            headlineLabel: 'Campaign Label',
            headlinePlaceholder: 'e.g. BERRY 2028',
            footerLabel: 'Issued By',
            footerPlaceholder: 'e.g. THE WHITE HOUSE',
            showEmail: false,
            showBranding: true
        },
        PublicNotice: {
            showHeadline: true,
            headlineLabel: 'Official Title',
            headlinePlaceholder: 'e.g. EXECUTIVE ORDER',
            footerLabel: 'Authorized By',
            footerPlaceholder: 'e.g. PRESIDENT BERRY BRIGHTSON',
            showEmail: true,
            showBranding: false
        },
        ViralQuote: {
            showHeadline: false,
            headlineLabel: '',
            headlinePlaceholder: '',
            footerLabel: 'Quote Author',
            footerPlaceholder: 'e.g. PRESIDENT BERRY',
            showEmail: false,
            showBranding: false
        }
    }

    const current = (config as any)[templateId] ||
        (templateId.includes('Notice') ? config.PublicNotice :
            templateId.includes('Quote') ? config.ViralQuote :
                config.BreakingNews)

    return (
        <div className="flex flex-col gap-4" onPaste={handlePaste}>
            {current.showHeadline && (
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 px-1">
                        <Type size={12} className="text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{current.headlineLabel}</label>
                    </div>
                    <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder={current.headlinePlaceholder}
                        className="pill-container w-full !p-3 font-bold text-base uppercase"
                    />
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 px-1">
                    <AlignLeft size={12} className="text-gray-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Main Content</label>
                </div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter your Presidential decree or a funny Berry joke..."
                    className="pill-container w-full !p-3 min-h-[120px] resize-none leading-relaxed text-base"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 px-1">
                    <Info size={12} className="text-gray-400" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{current.footerLabel}</label>
                </div>
                <input
                    type="text"
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                    placeholder={current.footerPlaceholder}
                    className="pill-container w-full !p-3 font-bold text-base"
                />
            </div>

            {current.showEmail && (
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 px-1">
                        <AtSign size={12} className="text-gray-400" />
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email</label>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. hello@postit.app"
                        className="pill-container w-full !p-3 text-base"
                    />
                </div>
            )}

            {current.showBranding && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 px-1">
                            <Info size={12} className="text-gray-400" />
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Branding Line 1</label>
                        </div>
                        <input
                            type="text"
                            value={brandingLine1}
                            onChange={(e) => setBrandingLine1(e.target.value)}
                            placeholder="e.g. POSTIT.APP"
                            className="pill-container w-full !p-3 font-bold text-base uppercase"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 px-1">
                            <Info size={12} className="text-gray-400" />
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Branding Line 2</label>
                        </div>
                        <input
                            type="text"
                            value={brandingLine2}
                            onChange={(e) => setBrandingLine2(e.target.value)}
                            placeholder="e.g. DIGITAL STUDIO"
                            className="pill-container w-full !p-3 font-bold text-base uppercase"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
