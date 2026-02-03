'use client'

import React, { useRef } from 'react'
import { useStore } from '@/lib/store'
import { ImageIcon, Upload, X } from 'lucide-react'
import { cn, compressImage, isMediaTemplate, getTemplateCategory } from '@/lib/utils'
import { extractColorsFromImage } from '@/lib/color-utils'
import { toast } from 'sonner'
import { LockOverlay } from '../common/LockOverlay'

export const MediaUpload = () => {
    const { templateId, mainImage, setMainImage, logo, setLogo, userTier, setExtractedColors } = useStore()
    const imageInputRef = useRef<HTMLInputElement>(null)
    const logoInputRef = useRef<HTMLInputElement>(null)

    if (!isMediaTemplate(templateId)) return null


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'logo') => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = async (event) => {
            const result = event.target?.result as string

            // Compress to 400kb
            const compressed = await compressImage(result, 400)

            if (type === 'image') {
                setMainImage(compressed)
                // Smart Color Extraction
                try {
                    const colors = await extractColorsFromImage(compressed)
                    setExtractedColors(colors)
                    toast.success('Smart Palette generated!')
                } catch (e) {
                    // Fail silently
                }
            }
            else setLogo(compressed)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Main Backdrop Upload */}
                {getTemplateCategory(templateId) !== 'Notice' && (
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-3 bg-white/50 p-3 rounded-2xl border border-gray-100">
                            <div
                                onClick={() => imageInputRef.current?.click()}
                                className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden transition-all shrink-0",
                                    mainImage ? "bg-primary/10" : "bg-gray-100 hover:bg-gray-200"
                                )}
                            >
                                {mainImage ? (
                                    <img src={mainImage} className="w-full h-full object-cover" alt="Thumb" />
                                ) : (
                                    <Upload size={18} className="text-gray-400" />
                                )}
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-primary/40 leading-none">Backdrop</span>
                                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">Optimize</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => imageInputRef.current?.click()}
                                        className="text-[10px] font-bold text-primary hover:underline"
                                    >
                                        {mainImage ? 'Change' : 'Upload'}
                                    </button>
                                    {mainImage && (
                                        <button
                                            onClick={() => setMainImage(null)}
                                            className="p-1 hover:bg-red-50 rounded-md transition-colors group"
                                            title="Remove backdrop"
                                        >
                                            <X size={12} className="text-red-500 group-hover:text-red-600" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} title="Choose backdrop image" />
                        </div>
                    </div>
                )}

                {/* Brand Logo Upload */}
                <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Custom Branding" className="flex-1">
                    <div className="flex items-center gap-3 bg-white/50 p-3 rounded-2xl border border-gray-100 h-full">
                        <div
                            onClick={() => userTier === 'pro' && logoInputRef.current?.click()}
                            className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden transition-all shrink-0",
                                logo ? "bg-primary/10 border border-primary/20" : "bg-gray-100 hover:bg-gray-200"
                            )}
                        >
                            {logo ? (
                                <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" />
                            ) : (
                                <ImageIcon size={18} className="text-gray-400" />
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">Logo</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => userTier === 'pro' && logoInputRef.current?.click()}
                                    className="text-[10px] font-bold text-primary hover:underline disabled:opacity-50"
                                    disabled={userTier === 'free'}
                                >
                                    {logo ? 'Change' : 'Upload'}
                                </button>
                                {logo && userTier === 'pro' && (
                                    <button
                                        onClick={() => setLogo(null)}
                                        className="p-1 hover:bg-red-50 rounded-md transition-colors group"
                                        title="Remove logo"
                                    >
                                        <X size={12} className="text-red-500 group-hover:text-red-600" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} title="Choose brand logo" />
                    </div>
                </LockOverlay>
            </div>
        </div>
    )
}
