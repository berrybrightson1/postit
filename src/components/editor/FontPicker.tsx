'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Search, Check, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOOGLE_FONTS } from '@/lib/fonts'

interface FontPickerProps {
    value: string
    onChange: (font: string) => void
    userTier: 'free' | 'pro'
}

export const FontPicker = ({ value, onChange, userTier }: FontPickerProps) => {
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Filter fonts based on search
    const filteredFonts = useMemo(() => {
        if (!search.trim()) return [] // Hide by default until they type
        return GOOGLE_FONTS.filter(font =>
            font.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 50)
    }, [search])

    // Effect to inject font stylesheet when value changes
    useEffect(() => {
        if (!value) return

        const fontId = `font-${value.replace(/\s+/g, '-').toLowerCase()}`
        if (document.getElementById(fontId)) return

        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?family=${value.replace(/\s+/g, '+')}:wght@400;700;900&display=swap`
        document.head.appendChild(link)
    }, [value])

    return (
        <div className="flex flex-col gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={14} />
                <input
                    type="text"
                    placeholder="Search Google Fonts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-9 pr-4 text-[11px] font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-300"
                />
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredFonts.map((font) => (
                    <button
                        key={font}
                        onClick={() => onChange(font)}
                        className={cn(
                            "group relative flex flex-col gap-1 p-3 rounded-xl border text-left transition-all hover:shadow-sm active:scale-[0.98]",
                            value === font
                                ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                : "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600 hover:bg-white"
                        )}
                        style={{ fontFamily: `'${font}', sans-serif` }}
                    >
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-black uppercase tracking-tight truncate max-w-[80%]">
                                {font}
                            </span>
                            {value === font && <Check size={10} strokeWidth={4} className="animate-in fade-in zoom-in duration-300" />}
                        </div>
                        <span className={cn(
                            "text-xs truncate",
                            value === font ? "text-white/80" : "text-gray-400 group-hover:text-gray-500"
                        )}>
                            The quick brown fox
                        </span>

                        {/* Dynamic Font Injector for Preview */}
                        <FontPreviewLoader font={font} />
                    </button>
                ))}

                {filteredFonts.length === 0 && search.trim() && (
                    <div className="col-span-2 py-8 text-center">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No fonts found</p>
                    </div>
                )}

                {filteredFonts.length === 0 && !search.trim() && value && (
                    <div className="col-span-2 py-4 px-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={10} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Choice</span>
                        </div>
                        <div
                            className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary"
                            style={{ fontFamily: `'${value}', sans-serif` }}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black uppercase tracking-tight">{value}</span>
                                <Check size={10} strokeWidth={4} />
                            </div>
                            <span className="text-xs truncate opacity-70">The quick brown fox</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// Small sub-component to load font sheets for the preview list
const FontPreviewLoader = ({ font }: { font: string }) => {
    useEffect(() => {
        const fontId = `preview-font-${font.replace(/\s+/g, '-').toLowerCase()}`
        if (document.getElementById(fontId)) return

        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;700&text=${encodeURIComponent(font + 'Thequickbrownfoxy')}&display=swap`
        document.head.appendChild(link)
    }, [font])
    return null
}
