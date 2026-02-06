'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { CheckCircle2, Heart, MessageCircle, Share2, Repeat2 } from 'lucide-react'
import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'
import { ImagePlaceholder } from './shared/ImagePlaceholder'
import { DraggableElement } from '../canvas/DraggableElement'
import { EditableText } from '../canvas/EditableText'

// Default X/Twitter logo
const TWITTER_X_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4IiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTI3LjUgMjRMMzUuNSAxNEgzMy41TDI2LjUgMjIuNUwyMSAxNEgxMi41TDIxIDI1TDEyLjUgMzVIMTQuNUwyMS41IDI2LjVMMjcgMzVIMzUuNUwyNy41IDI0WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4='

export const TwitterStyle = () => {
    const {
        headline,
        body,
        footer,
        primaryColor,
        textColor,
        backgroundColor,
        mainImage,
        backdropPosition,
        logo,
        aspectRatio,
        brandingLine1,
        brandingLine2,
        fontFamily,
        fontStyle,
        textDecoration,
        fontWeight,
        textAlign,
        autoFontSize,
        userTier,
        templateId,
        templateStyles,
        profileImage,
        setHeadline,
        setBody,
        setFooter
    } = useStore()

    const bodySize = templateStyles[templateId]?.bodySize || 1
    const brandName = footer.includes('.') ? footer.split('.')[0] : footer
    // Clean handle logic: remove spaces, ensure @ prefix, lowercase
    const handleRaw = footer.toLowerCase().replace(/\s+/g, '')
    const handle = handleRaw.startsWith('@') ? handleRaw : `@${handleRaw}`

    // Check if dark mode (background is dark)
    const isDark = backgroundColor === '#000000' || backgroundColor === '#15202b'
    const xBgColor = isDark ? '#000000' : '#FFFFFF'
    const xTextColor = isDark ? '#E7E9EA' : '#0F1419'
    const xSubTextColor = isDark ? '#71767B' : '#536471'

    return (
        <div
            className={cn(
                "w-full h-full relative overflow-hidden flex flex-col p-4 pb-6",
                isDark ? "bg-black" : "bg-white"
            )}
            style={{ backgroundColor: xBgColor }}
        >
            {/* Header: Avatar, Name, Handle, Logo */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <DraggableElement id="headline" className="flex gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img src={profileImage || TWITTER_X_LOGO} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <div className="flex flex-col leading-tight justify-center">
                        <div className="flex items-center gap-1">
                            <EditableText
                                value={headline}
                                onChange={setHeadline}
                                className="font-bold text-[15px] min-w-[50px]"
                                style={{ color: xTextColor }}
                                placeholder="Post Author"
                            />
                            <CheckCircle2 size={16} className="text-[#1D9BF0] fill-[#1D9BF0] text-white" />
                        </div>
                        <span className="text-[15px]" style={{ color: xSubTextColor }}>{handle}</span>
                    </div>
                </DraggableElement>
                <div className="opacity-80">
                    {/* X Logo - switch based on theme */}
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" style={{ fill: xTextColor }}><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </div>
            </div>

            {/* Post Content */}
            <DraggableElement id="body" className="mb-3 relative z-10 flex-shrink-0">
                <EditableText
                    tagName="p"
                    value={body}
                    onChange={setBody}
                    className="whitespace-pre-wrap leading-normal min-w-[100px]"
                    style={{
                        color: xTextColor,
                        fontFamily,
                        fontSize: `calc(1.2rem * ${bodySize})`,
                        fontWeight,
                        fontStyle,
                        textDecoration,
                        textAlign: textAlign as any
                    }}
                    placeholder="What's happening?"
                />
            </DraggableElement>

            {/* Media Area (Main Image) */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative z-10 w-full mb-3 flex-shrink-0 min-h-[200px] max-h-[50%] bg-gray-50/50">
                {mainImage ? (
                    <img src={mainImage} className={cn("w-full h-full object-cover max-h-[350px]", backdropPosition)} alt="Post media" />
                ) : (
                    <ImagePlaceholder />
                )}
            </div>

            {/* Date / Time */}
            <div className="flex items-center gap-1.5 text-[15px] mb-4 border-b border-gray-100 dark:border-gray-800 pb-4 relative z-10" style={{ color: xSubTextColor }}>
                <span className="hover:underline cursor-pointer">9:41 AM · Feb 2, 2026</span>
                <span>·</span>
                <span className="font-bold hover:underline cursor-pointer" style={{ color: xTextColor }}>4.2M</span>
                <span>Views</span>
            </div>

            {/* Interaction Icons */}
            <DraggableElement id="footer" className="flex justify-between items-center px-2 relative z-10 w-full mt-auto">
                <div className="flex items-center gap-2 group cursor-pointer" style={{ color: xSubTextColor }}>
                    <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} />
                    </div>
                    <span className="text-sm group-hover:text-blue-500 transition-colors">1.2k</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer" style={{ color: xSubTextColor }}>
                    <div className="p-2 rounded-full group-hover:bg-green-50 group-hover:text-green-500 transition-colors">
                        <Repeat2 size={20} />
                    </div>
                    <span className="text-sm group-hover:text-green-500 transition-colors">4.8k</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer" style={{ color: xSubTextColor }}>
                    <div className="p-2 rounded-full group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors">
                        <Heart size={20} />
                    </div>
                    <span className="text-sm group-hover:text-pink-500 transition-colors">24k</span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer" style={{ color: xSubTextColor }}>
                    <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <Share2 size={20} />
                    </div>
                </div>
            </DraggableElement>

            <div className="absolute top-4 right-4 z-0 opacity-0 pointer-events-none">
                <TemplateLogo mode="draggable" />
            </div>
        </div>
    )
}
