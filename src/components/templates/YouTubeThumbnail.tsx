'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { TemplateBackdrop } from './shared/TemplateBackdrop'
import { TemplateLogo } from './shared/TemplateLogo'

export const YouTubeThumbnail = () => {
    const {
        headline,
        body,
        primaryColor,
        textColor,
        templateId,
        templateStyles
    } = useStore() // Remove bodySize from destructuring to avoid conflict

    // Access styling from the current template definitions
    const style = templateStyles[templateId] || {}
    const bodySize = style.bodySize || 1 // Override the store root bodySize with the template specific one
    const fontWeight = style.fontWeight || 'bold'
    const lineHeight = style.lineHeight
    const letterSpacing = style.letterSpacing
    const fontFamily = style.fontFamily || 'Impact' // Fallback font

    return (
        <div className="w-full aspect-video flex bg-white font-sans overflow-hidden shadow-2xl">
            {/* Left Side: Image (50%) */}
            <div className="w-1/2 h-full relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <TemplateBackdrop
                    className="opacity-100 object-cover w-full h-full"
                    overlayClassName="hidden" // No dark overlay on the image side
                />
            </div>

            {/* Right Side: Text (50%) */}
            <div
                className="w-1/2 h-full flex flex-col justify-center p-8 lg:p-12 relative"
                style={{ backgroundColor: primaryColor }} // Using primary color for the text background based on the "red" side in the prompt description (implied)
            >
                <div className="flex flex-col gap-6 items-start">
                    <h1
                        className="font-black uppercase break-words w-full transition-all duration-300"
                        style={{
                            color: textColor,
                            fontFamily: fontFamily,
                            fontSize: `calc(3rem * ${bodySize || 1})`,
                            fontWeight: fontWeight,
                            lineHeight: lineHeight !== undefined ? lineHeight : 0.9,
                            letterSpacing: `${letterSpacing !== undefined ? letterSpacing : -0.05}em`,
                            textAlign: 'left'
                        }}
                    >
                        {headline}
                    </h1>

                    <p
                        className="font-bold uppercase opacity-90 break-words w-full transition-all duration-300"
                        style={{
                            color: textColor,
                            fontFamily: fontFamily,
                            fontSize: `calc(1.2rem * ${bodySize || 1})`,
                            fontWeight: fontWeight,
                            lineHeight: (lineHeight !== undefined ? lineHeight : 1.1) + 0.2, // Slightly looser for body
                            letterSpacing: `${letterSpacing !== undefined ? letterSpacing : 0}em`,
                            textAlign: 'left'
                        }}
                    >
                        {body}
                    </p>
                </div>

                <TemplateLogo containerClassName="!top-6 !right-6 pointer-events-none opacity-50" />
            </div>
        </div>
    )
}

