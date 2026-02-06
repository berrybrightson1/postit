'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TemplateLogo } from './shared/TemplateLogo'
import { TemplateBackdrop } from './shared/TemplateBackdrop'
import { fontWeightMap } from '@/lib/utils'
import { ImagePlaceholder } from './shared/ImagePlaceholder'
import { DraggableElement } from '../canvas/DraggableElement'
import { EditableText } from '../canvas/EditableText'

// Default Facebook logo
const FACEBOOK_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4IiBmaWxsPSIjMTg3N0YyIi8+PHBhdGggZD0iTTI2LjUgMjVIMzBMMzEgMjBIMjYuNVYxNy41QzI2LjUgMTYgMjYuNSAxNC41IDI5IDE0LjVIMzFWMTAuMjVDMzAuMzUgMTAuMTc1IDI4LjcgMTAgMjcgMTBDMjMuMiAxMCAyMC41IDEyLjQzNzUgMjAuNSAxNi43NVYyMEgxNlYyNUgyMC41VjM4SDI2LjVWMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='

export const FacebookPost = () => {
    const {
        headline,
        body,
        footer,
        email,
        brandingLine1,
        brandingLine2,
        textColor,
        bodySize,
        fontFamily,
        textAlign,
        profileImage,
        setProfileImage,
        mainImage,
        backdropPosition,
        fontWeight,
        fontStyle,
        textDecoration,
        setHeadline,
        setFooter,
        setBody,
        setEmail,
        setBrandingLine1,
        setBrandingLine2
    } = useStore()

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return (
        <div className="w-full h-full relative overflow-hidden bg-white flex flex-col font-sans">
            {/* Header */}
            <div className="px-4 py-3 flex items-start justify-between bg-white z-10">
                <DraggableElement id="headline" className="flex gap-3">
                    <div
                        className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative cursor-pointer group"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src={profileImage || FACEBOOK_LOGO} className="w-full h-full object-cover" alt="Profile" />
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        setProfileImage(reader.result as string)
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }}
                            title="Upload profile image"
                            placeholder="Upload profile image"
                        />
                    </div>
                    <div className="flex flex-col">
                        <EditableText
                            tagName="h3"
                            value={headline}
                            onChange={setHeadline}
                            className="font-bold text-gray-900 text-[15px] leading-tight hover:underline cursor-pointer min-w-[50px]"
                            placeholder="Post Author"
                        />
                        <div className="flex items-center gap-1.5 text-gray-500 text-[12px] mt-0.5">
                            <EditableText
                                value={footer}
                                onChange={setFooter}
                                className="min-w-[30px]"
                                placeholder="Just now"
                            />
                            <span>·</span>
                            <Globe size={11} />
                        </div>
                    </div>
                </DraggableElement>
                <MoreHorizontal className="text-gray-500" />
            </div>

            {/* Main Content Area */}
            <div className="relative w-full flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900">

                {/* Text Area */}
                {body && (
                    <DraggableElement id="body" className="px-4 pb-3 pt-1 w-full text-left relative z-10 bg-white text-gray-900">
                        <EditableText
                            tagName="p"
                            value={body}
                            onChange={setBody}
                            style={{
                                fontFamily,
                                fontSize: `calc(1rem * ${bodySize})`,
                                fontWeight: fontWeightMap[fontWeight],
                                color: textColor !== '#FFFFFF' ? textColor : undefined, // Inherit or custom
                                textAlign: (textAlign || 'left') as any,
                                fontStyle, textDecoration
                            }}
                            className={cn("leading-relaxed min-w-[100px]", (!textColor || textColor === '#FFFFFF') ? 'text-black dark:text-white' : '')}
                            placeholder="What's on your mind?"
                        />
                    </DraggableElement>
                )}

                {/* Media Area - Backdrop and Image live here */}
                <div className="w-full relative flex-1 min-h-[200px] bg-gray-50 dark:bg-gray-800">
                    {/* Backdrop provides background color and placeholder */}
                    <TemplateBackdrop />

                    {mainImage && (
                        <img
                            src={mainImage}
                            className={cn("w-full h-full object-cover absolute inset-0 z-10", backdropPosition)}
                            alt="Post content"
                        />
                    )}
                </div>
            </div>

            {/* Interaction Bar */}
            <DraggableElement id="footer" className="px-4 py-2 bg-white z-10 border-b border-gray-100">
                <div className="flex justify-between items-center text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <div className="flex -space-x-1 flex-shrink-0">
                            <div className="bg-blue-500 text-white rounded-full p-[3px] w-[18px] h-[18px] flex items-center justify-center ring-2 ring-white z-20">
                                <ThumbsUp size={10} fill="currentColor" />
                            </div>
                            <div className="bg-red-500 text-white rounded-full p-[3px] w-[18px] h-[18px] flex items-center justify-center ring-2 ring-white z-10">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </div>
                        </div>
                        <EditableText
                            tagName="span"
                            value={email}
                            onChange={setEmail}
                            className="ml-1 hover:underline cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-[50px]"
                            placeholder="You and 34 others"
                        />
                    </div>
                    <div className="flex gap-3 text-gray-500 flex-shrink-0 whitespace-nowrap">
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <EditableText
                                value={brandingLine1}
                                onChange={setBrandingLine1}
                                className="min-w-[10px]"
                                placeholder="0"
                            />
                            <span>comments</span>
                        </div>
                        <div className="flex gap-1 hover:underline cursor-pointer">
                            <EditableText
                                value={brandingLine2}
                                onChange={setBrandingLine2}
                                className="min-w-[10px]"
                                placeholder="0"
                            />
                            <span>shares</span>
                        </div>
                    </div>
                </div>
            </DraggableElement>

            {/* Action Buttons */}
            <div className="px-2 py-1 bg-white z-10">
                <div className="flex items-center justify-between border-t border-gray-200 pt-1">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                        <ThumbsUp size={18} />
                        <span>Like</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageCircle size={18} />
                        <span>Comment</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
                        <Share2 size={18} />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
