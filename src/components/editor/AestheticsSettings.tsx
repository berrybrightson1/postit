'use client'

import React, { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { ShieldCheck, ShieldAlert, Layers, Palette, Pipette } from 'lucide-react'
import { cn, isMediaTemplate } from '@/lib/utils'
import { LockOverlay } from '@/components/common/LockOverlay'
import { ToolbarColorPicker } from './shared/ToolbarColorPicker'

export const AestheticsSettings = () => {
    const {
        templateId,
        primaryColor,
        textColor,
        backgroundColor,
        showWatermark,
        recentBackgrounds,
        recentTexts,
        recentAccents,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        setShowWatermark,
        userTier,
        showReadabilityGradient, setShowReadabilityGradient,
        applyVibe,
        extractedColors,
        mainImage,
        setMainImage
    } = useStore()

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleImageUploadTrigger = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result) {
                setMainImage(event.target.result as string)
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="flex flex-col gap-4">

            {/* Hidden Input for BG Image */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Watermark Container */}
            {isMediaTemplate(templateId) && (
                <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro to remove branding">
                    <div className="pill-container !flex-row !items-center !justify-between !p-4">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                showWatermark ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                            )}>
                                {showWatermark ? <ShieldCheck size={16} strokeWidth={3} /> : <ShieldAlert size={16} strokeWidth={3} />}
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-tight block">Official branding</span>
                                <p className="text-[9px] text-gray-500 font-medium">Add subtle POSTIT watermark</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowWatermark(!showWatermark)}
                            className={cn(
                                "w-10 h-5 rounded-full transition-all relative",
                                showWatermark ? "bg-primary" : "bg-gray-200"
                            )}
                            aria-label="Toggle Watermark"
                            title={showWatermark ? "Disable common watermark" : "Enable common watermark"}
                        >
                            <div className={cn(
                                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                showWatermark ? "right-1" : "left-1"
                            )} />
                        </button>
                    </div>
                </LockOverlay>
            )}
        </div>
    )
}
