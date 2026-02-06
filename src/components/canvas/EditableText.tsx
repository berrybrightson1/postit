'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface EditableTextProps {
    value: string
    onChange: (value: string) => void
    className?: string
    style?: React.CSSProperties
    tagName?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
    placeholder?: string
}

export const EditableText = ({
    value,
    onChange,
    className,
    style,
    tagName = 'span',
    placeholder
}: EditableTextProps) => {
    const contentRef = useRef<HTMLElement>(null)
    const lastEmittedValue = useRef(value)

    useEffect(() => {
        if (contentRef.current && contentRef.current.textContent !== value) {
            // Only update if the value is externally changed and different
            // to avoid cursor jumping
            if (value !== lastEmittedValue.current) {
                contentRef.current.innerText = value
            }
        }
    }, [value])

    const handleInput = (e: React.FormEvent<HTMLElement>) => {
        const newValue = e.currentTarget.innerText
        lastEmittedValue.current = newValue
        onChange(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent event propagation so resizing/dragging doesn't trigger
        e.stopPropagation()
    }

    // Stop propagation of pointer down to prevent parent DraggableElement from stealing the event
    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation()
    }

    const Tag = tagName as any

    return (
        <Tag
            ref={contentRef}
            className={cn("outline-none min-w-[1ch] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 cursor-text focus:ring-2 focus:ring-primary/20 rounded-sm px-1 -mx-1", className)}
            style={style}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onMouseDown={(e: any) => e.stopPropagation()}
            data-placeholder={placeholder}
        >
            {value}
        </Tag>
    )
}
