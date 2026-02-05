'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface TemplateLogoProps {
    className?: string
    style?: React.CSSProperties
    containerClassName?: string
    mode?: 'static' | 'draggable'
}

export const TemplateLogo = ({ className, style, containerClassName, mode = 'static' }: TemplateLogoProps) => {
    const { logo, isLogoDraggable, logoPosition, setLogoPosition, setLogo } = useStore()

    if (!logo) return null

    // If we are in static mode, but dragging is enabled, we hide this instance
    // because the global "draggable" instance in PreviewStage will take over.
    if (mode === 'static' && isLogoDraggable) return null

    // If we are in draggable mode, but dragging is disabled, we hide this instance
    // because the static instances inside the templates will show.
    if (mode === 'draggable' && !isLogoDraggable) return null

    return (
        <div
            className={cn(
                "absolute z-[100] p-2 group transition-all",
                mode === 'draggable' ? "cursor-move hover:ring-2 hover:ring-primary/20 rounded-lg pointer-events-auto" : "pointer-events-none",
                containerClassName
            )}
            style={{
                ...style,
                ...(mode === 'draggable' ? {
                    left: `${logoPosition.x}%`,
                    top: `${logoPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute'
                } : {})
            }}
            onMouseDown={(e) => {
                if (mode !== 'draggable') return
                e.preventDefault()
                e.stopPropagation()
                const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                if (!rect) return

                // Calculate initial verified offset
                const startX = e.clientX
                const startY = e.clientY
                const startLogoX = logoPosition.x
                const startLogoY = logoPosition.y

                const onMouseMove = (moveEvent: MouseEvent) => {
                    const deltaXPixels = moveEvent.clientX - startX
                    const deltaYPixels = moveEvent.clientY - startY

                    // Convert pixel delta to percentage delta
                    const deltaXPercent = (deltaXPixels / rect.width) * 100
                    const deltaYPercent = (deltaYPixels / rect.height) * 100

                    setLogoPosition({
                        x: Math.max(0, Math.min(100, startLogoX + deltaXPercent)),
                        y: Math.max(0, Math.min(100, startLogoY + deltaYPercent))
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
            <img
                src={logo}
                className={cn("h-12 w-auto object-contain drop-shadow-xl transition-all", className)}
                alt="Logo"
                draggable={false}
            />
            {mode === 'draggable' && (
                <>
                    <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        DRAG
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation() // Prevent drag start when clicking close
                            setLogo(null)
                        }}
                        className="absolute -top-2 -left-2 bg-red-500 text-white w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center hover:bg-red-600 cursor-pointer pointer-events-auto"
                        title="Remove Logo"
                    >
                        <span className="text-[10px] font-bold leading-none select-none">&times;</span>
                    </button>
                </>
            )}
        </div>
    )
}
