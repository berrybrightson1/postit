'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface TemplateLogoProps {
    className?: string
    style?: React.CSSProperties
    containerClassName?: string
}

export const TemplateLogo = ({ className, style, containerClassName }: TemplateLogoProps) => {
    const { logo, isLogoDraggable, logoPosition, setLogoPosition } = useStore()

    if (!logo) return null

    return (
        <div
            className={cn(
                "absolute z-[100] p-2 group transition-shadow",
                isLogoDraggable ? "cursor-move hover:ring-2 hover:ring-primary/20 rounded-lg" : "pointer-events-none",
                containerClassName
            )}
            style={{
                ...style,
                ...(isLogoDraggable ? {
                    left: `${logoPosition.x}%`,
                    top: `${logoPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute'
                } : {})
            }}
            onMouseDown={(e) => {
                if (!isLogoDraggable) return
                const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                if (!rect) return
                const onMouseMove = (moveEvent: MouseEvent) => {
                    const x = ((moveEvent.clientX - rect.left) / rect.width) * 100
                    const y = ((moveEvent.clientY - rect.top) / rect.height) * 100
                    setLogoPosition({
                        x: Math.max(0, Math.min(100, x)),
                        y: Math.max(0, Math.min(100, y))
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
            />
            {isLogoDraggable && (
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    DRAG
                </div>
            )}
        </div>
    )
}
