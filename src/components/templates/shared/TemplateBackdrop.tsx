'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ImagePlaceholder } from './ImagePlaceholder'

interface TemplateBackdropProps {
    className?: string
    overlayClassName?: string
    style?: React.CSSProperties
}

export const TemplateBackdrop = ({ className, overlayClassName, style }: TemplateBackdropProps) => {
    const { mainImage, backdropPosition, showReadabilityGradient, userTier, backgroundColor, body } = useStore()

    // if (!mainImage) return null // Old behavior: redundant

    // New behavior: Show simple "+" placeholder if no image AND no content
    // Standardize placeholder behavior: Always show "+" placeholder if no image is present
    if (!mainImage) {
        return (
            <div
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ backgroundColor, ...style }}
            >
                {/* Always show placeholder for consistency */}
                <ImagePlaceholder />

                {/* Keep readability gradient overlay structure if needed */}
                <div className={cn("absolute inset-0", overlayClassName)} />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 z-0" style={style}>
            <img
                src={mainImage}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    backdropPosition,
                    className || (userTier === 'free' ? "opacity-30" : "opacity-40")
                )}
                alt="Backdrop"
            />
            <div
                className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    showReadabilityGradient ? "opacity-100" : "opacity-80",
                    overlayClassName
                )}
            />
            {showReadabilityGradient && (
                <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300" />
            )}
        </div>
    )
}
