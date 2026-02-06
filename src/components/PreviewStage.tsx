'use client'

import React, { useRef } from 'react'
import { useStore } from '@/lib/store'
import { TemplateRenderer } from './TemplateRenderer'
import { DraggableOverlay } from './canvas/DraggableOverlay'
import { TemplateLogo } from './templates/shared/TemplateLogo'
import { cn } from '@/lib/utils'

export const PreviewStage = () => {
    const { aspectRatio, overlays, updateOverlay, removeOverlay } = useStore()
    const previewRef = useRef<HTMLDivElement>(null!)

    return (
        <div className="flex flex-col items-center gap-6 w-full px-0 lg:p-2 relative">
            <div
                className="w-full max-w-full lg:max-w-[480px] mx-auto"
            >
                <div
                    id="postit-export-canvas"
                    ref={previewRef}
                    className={cn(
                        "bg-white shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-stretch",
                        aspectRatio === '1:1' ? 'aspect-square w-full' :
                            aspectRatio === '4:5' ? 'aspect-[4/5] w-full max-h-[75dvh] lg:max-h-[85vh]' :
                                aspectRatio === '16:9' ? 'aspect-video w-full' :
                                    'aspect-[9/16] w-full max-h-[75dvh] lg:max-h-[85vh]'
                    )}
                >
                    <TemplateRenderer />
                    <TemplateLogo mode="draggable" />

                    {/* Overlays Layer */}
                    <div className="absolute inset-0 z-[100] pointer-events-none">
                        <div className="relative w-full h-full pointer-events-auto">
                            {overlays.map((overlay) => (
                                <DraggableOverlay
                                    key={overlay.id}
                                    item={overlay}
                                    onUpdate={updateOverlay}
                                    onRemove={removeOverlay}
                                    containerRef={previewRef}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating badge to not affect content below flow */}
            <div className="absolute -bottom-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-50 pointer-events-none">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                Preview Mode
            </div>
        </div>
    )
}
