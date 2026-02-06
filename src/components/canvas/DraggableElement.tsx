'use client'

import React from 'react'
import { motion, useDragControls } from 'framer-motion'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { GripVertical } from 'lucide-react'

interface DraggableElementProps {
    id: string
    children: React.ReactNode
    className?: string
}

export const DraggableElement = ({ id, children, className }: DraggableElementProps) => {
    const { isDragMode, elementPositions, setElementPosition } = useStore()
    const controls = useDragControls()

    // Get current position or default to {0,0}
    const position = elementPositions[id] || { x: 0, y: 0 }

    if (!isDragMode) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div
            drag
            dragControls={controls}
            dragMomentum={false}
            dragListener={true} // Enable direct drag
            initial={false}
            animate={{ x: position.x, y: position.y }}
            onDragEnd={(_, info) => {
                setElementPosition(id, {
                    x: position.x + info.offset.x,
                    y: position.y + info.offset.y
                })
            }}
            className={cn(
                "relative group cursor-move", // Cursor change for discoverability
                className
            )}
        >
            {/* Photoshop style transformation frame */}
            <div className="absolute -inset-2 border-2 border-primary/40 rounded-sm pointer-events-none">
                {/* Corner Handles */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-primary" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-primary" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-primary" />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}
