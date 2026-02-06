'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, Check, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOOGLE_FONTS } from '@/lib/fonts'

interface FontPickerProps {
    value: string
    onChange: (font: string) => void
    userTier: 'free' | 'pro'
}

export const FontPicker = ({ value, onChange, userTier }: FontPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

    // Filter fonts based on search
    const filteredFonts = useMemo(() => {
        const query = search.toLowerCase().trim()
        if (!query) return GOOGLE_FONTS.slice(0, 50)
        return GOOGLE_FONTS.filter(font =>
            font.toLowerCase().includes(query)
        ).slice(0, 50)
    }, [search])

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

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                // Also check if the click target is within the portal dropdown
                const portalDropdown = document.getElementById('font-picker-portal')
                if (portalDropdown && portalDropdown.contains(event.target as Node)) {
                    return
                }
                setIsOpen(false)
                setSearch('') // Clear search on close
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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

    // Effect to inject font stylesheet when value changes
    useEffect(() => {
        if (!value) return
        injectFont(value)
    }, [value])

    const injectFont = (fontName: string, isPreview = false) => {
        const fontId = isPreview
            ? `preview-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`
            : `font-${fontName.replace(/\s+/g, '-').toLowerCase()}`

        if (document.getElementById(fontId)) return

        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        const suffix = isPreview ? `&text=${encodeURIComponent(fontName + 'Thequickbrownfoxy')}` : ':wght@100;400;500;600;700;800;900'
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}${suffix}&display=swap`
        document.head.appendChild(link)
    }

    const dropdown = (isOpen && coords.top > 0) ? (
        <div
            id="font-picker-portal"
            className="fixed z-[9999] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 origin-top"
            style={{
                top: coords.top + 4,
                left: coords.left,
                width: coords.width,
                maxHeight: '300px'
            }}
        >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                {filteredFonts.map((font) => (
                    <button
                        key={font}
                        onClick={(e) => {
                            e.stopPropagation()
                            onChange(font)
                            setIsOpen(false)
                            setSearch('')
                        }}
                        onMouseEnter={() => injectFont(font, true)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all group/fontitem",
                            value === font
                                ? "bg-primary/5 text-primary"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                        style={{ fontFamily: `'${font}', sans-serif` }}
                    >
                        <div className="flex flex-col gap-0.5 max-w-[85%]">
                            <span className="text-[11px] font-black uppercase tracking-tight truncate">
                                {font}
                            </span>
                            <span className="text-[10px] opacity-60 truncate">
                                The quick brown fox
                            </span>
                        </div>
                        {value === font && <Check size={12} strokeWidth={3} className="text-primary" />}
                    </button>
                ))}

                {filteredFonts.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No fonts found</p>
                    </div>
                )}
            </div>
        </div>
    ) : null

    return (
        <div className="relative w-full" ref={containerRef}>
            {/* Word Style Input/Dropdown Toggle */}
            <div
                className={cn(
                    "flex items-center gap-2 h-9 bg-gray-50 border border-gray-100 rounded-xl px-3 transition-all cursor-pointer group/font",
                    isOpen ? "ring-2 ring-primary/20 border-primary/20 bg-white shadow-sm" : "hover:border-gray-200 hover:bg-gray-100/50"
                )}
                onClick={toggleOpen}
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={isOpen ? search : value}
                        onChange={(e) => {
                            if (!isOpen) {
                                updateCoords()
                                setIsOpen(true)
                            }
                            setSearch(e.target.value)
                        }}
                        placeholder="Search Fonts..."
                        className="w-full bg-transparent text-[11px] font-bold text-gray-700 outline-none placeholder:text-gray-300 pointer-events-auto"
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!isOpen) {
                                updateCoords()
                                setIsOpen(true)
                            }
                        }}
                    />
                </div>
                <ChevronDown
                    size={14}
                    className={cn(
                        "text-gray-400 transition-transform duration-200",
                        isOpen ? "rotate-180 text-primary" : "group-hover/font:text-gray-600"
                    )}
                />
            </div>

            {typeof document !== 'undefined' && createPortal(dropdown, document.body)}
        </div>
    )
}
