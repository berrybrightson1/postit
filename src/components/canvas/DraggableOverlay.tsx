'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { useStore, type OverlayItem, defaultPalette } from '@/lib/store'
import { X, Type, Smile, Star, Heart, Zap, BadgeCheck, Cloud, Music, Flame, ThumbsUp, Tag, Globe, Camera, RotateCw, Palette } from 'lucide-react'

// Map sticker names to components
const ICON_MAP: Record<string, any> = {
    'Smile': Smile,
    'Star': Star,
    'Heart': Heart,
    'Zap': Zap,
    'Verified': BadgeCheck,
    'Cloud': Cloud,
    'Music': Music,
    'Hot': Flame,
    'Like': ThumbsUp,
    'Sale': Tag,
    'Web': Globe,
    'Photo': Camera
}
import { cn } from '@/lib/utils'

interface DraggableOverlayProps {
    item: OverlayItem
    onRemove: (id: string) => void
    onUpdate: (id: string, changes: Partial<OverlayItem>) => void
    containerRef: React.RefObject<HTMLDivElement>
}

export const DraggableOverlay = ({ item, onRemove, onUpdate, containerRef }: DraggableOverlayProps) => {
    const controls = useDragControls()

    // Scale constraints
    const handleScale = (delta: number) => {
        const newScale = Math.max(0.5, Math.min(3, item.scale + delta))
        onUpdate(item.id, { scale: newScale })
    }

    // Rotation
    const handleRotate = () => {
        onUpdate(item.id, { rotation: (item.rotation + 45) % 360 })
    }

    // Color Cycle
    const handleColorChange = () => {
        const currentIndex = defaultPalette.indexOf(item.color || '#000000')
        const nextColor = defaultPalette[(currentIndex + 1) % defaultPalette.length]
        onUpdate(item.id, { color: nextColor })
    }

    return (
        <motion.div
            drag
            dragControls={controls}
            dragMomentum={false}
            dragConstraints={containerRef}
            initial={{ x: item.x, y: item.y, scale: 0.5, opacity: 0 }}
            animate={{ x: item.x, y: item.y, scale: item.scale, rotate: item.rotation, opacity: 1 }}
            onDragEnd={(_, info) => {
                onUpdate(item.id, { x: item.x + info.offset.x, y: item.y + info.offset.y })
            }}
            className="absolute z-50 cursor-move group touch-none origin-center"
        >
            <div className="relative group-hover:ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent rounded-lg transition-all p-2">
                {/* Content */}
                <div className="text-[32px] leading-none select-none drop-shadow-xl" style={{ color: item.color }}>
                    {item.type === 'sticker' && ICON_MAP[item.content] ? (
                        React.createElement(ICON_MAP[item.content], { size: 64, strokeWidth: 1.5 })
                    ) : (
                        item.content
                    )}
                </div>

                {/* Controls (Visible on Hover/Touch) */}
                <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(item.id) }}
                        className="bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                        title="Remove Sticker"
                        aria-label="Remove Sticker"
                    >
                        <X size={10} strokeWidth={3} />
                    </button>
                </div>

                <div className="absolute -bottom-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleScale(0.1) }}
                        className="bg-white text-black rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                        title="Scale Up"
                        aria-label="Scale Up"
                    >
                        <Type size={10} strokeWidth={3} />
                    </button>
                </div>

                {/* Bottom Left: Rotate */}
                <div className="absolute -bottom-3 -left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRotate() }}
                        className="bg-white text-black rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                        title="Rotate Sticker"
                        aria-label="Rotate Sticker"
                    >
                        <RotateCw size={10} strokeWidth={3} />
                    </button>
                </div>

                {/* Top Left: Color */}
                <div className="absolute -top-3 -left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleColorChange() }}
                        className="bg-white text-black rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                        style={{ color: item.color }}
                        title="Cycle Color"
                        aria-label="Cycle Color"
                    >
                        <Palette size={10} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
