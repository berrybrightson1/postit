'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
    label: string
    value: string | number
}

interface BrandedSelectProps {
    value: string | number
    onChange: (value: any) => void
    options: Option[]
    placeholder?: string
    className?: string
}

export const BrandedSelect = ({ value, onChange, options, placeholder, className }: BrandedSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

    const selectedOption = options.find(o => o.value === value)

    const updateCoords = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
    }

    const toggleOpen = () => {
        if (!isOpen) {
            updateCoords()
        }
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('scroll', updateCoords)
            window.addEventListener('resize', updateCoords)
        }
        return () => {
            window.removeEventListener('scroll', updateCoords)
            window.removeEventListener('resize', updateCoords)
        }
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const dropdown = (isOpen && coords.top > 0) ? (
        <div
            className="fixed z-[9999] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
            style={{
                top: coords.top + 4,
                left: coords.left,
                width: coords.width,
                maxHeight: '300px'
            }}
        >
            <div className="overflow-y-auto custom-scrollbar p-1">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => {
                            onChange(option.value)
                            setIsOpen(false)
                        }}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all",
                            value === option.value
                                ? "bg-primary/5 text-primary font-bold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <span className="text-[11px] uppercase tracking-tight">{option.label}</span>
                        {value === option.value && <Check size={10} strokeWidth={4} />}
                    </button>
                ))}
            </div>
        </div>
    ) : null

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <button
                onClick={toggleOpen}
                title={placeholder || "Select option"}
                className={cn(
                    "w-full h-9 flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-3 text-[11px] font-bold text-gray-700 transition-all",
                    isOpen ? "ring-2 ring-primary/10 border-primary/20 bg-white shadow-sm" : "hover:border-gray-200 hover:bg-gray-100/50"
                )}
            >
                <span className="truncate">{selectedOption?.label || placeholder}</span>
                <ChevronDown
                    size={12}
                    className={cn("text-gray-400 transition-transform duration-200", isOpen && "rotate-180 text-primary")}
                />
            </button>
            {typeof document !== 'undefined' && createPortal(dropdown, document.body)}
        </div>
    )
}
