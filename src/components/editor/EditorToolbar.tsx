'use client'

import React, { useState, useRef } from 'react'
import { useStore, type AspectRatio } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
    Square, Smartphone, Eye, EyeOff, MousePointer2,
    Trash2, AlignLeft, AlignCenter, AlignRight,
    Sparkles, Pipette, Layers, Palette, Hash,
    Type, Smile, Search, ImagePlus, X
} from 'lucide-react'
import { EMOJI_CATEGORIES } from '@/lib/constants'

// Compact Color Picker Sub-component
const ToolbarColorPicker = ({
    label,
    value,
    onChange,
    icon: Icon,
    recentColors = [],
    smartColors = [],
    userTier,
    showImageUpload,
    onImageUpload,
    onImageRemove,
    hasImage
}: {
    label: string,
    value: string,
    onChange: (val: string) => void,
    icon: any,
    recentColors?: string[],
    smartColors?: string[],
    userTier: 'free' | 'pro',
    showImageUpload?: boolean,
    onImageUpload?: () => void,
    onImageRemove?: () => void,
    hasImage?: boolean
}) => {
    const pickerRef = useRef<HTMLInputElement>(null)

    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100/50 rounded-xl border border-transparent hover:border-black/5 transition-all">
            <div className="flex items-center gap-1.5 mr-1">
                <Icon size={10} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">{label}</span>
            </div>

            <div className="flex items-center gap-1">
                <div
                    onClick={() => userTier === 'pro' && pickerRef.current?.click()}
                    className={cn(
                        "w-6 h-6 rounded-lg border border-black/10 cursor-pointer shadow-inner relative transition-transform active:scale-90",
                        userTier === 'free' && "grayscale opacity-50 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: value }}
                >
                    <input
                        ref={pickerRef}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={userTier === 'free'}
                    />
                </div>

                <div className="flex gap-1 ml-1">
                    {(smartColors.length > 0 ? smartColors : recentColors).slice(0, 4).map((c, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(c)}
                            className={cn(
                                "w-5 h-5 lg:w-4 lg:h-4 rounded-full ring-1 ring-inset ring-black/5 transition-transform hover:scale-110",
                                value.toLowerCase() === c.toLowerCase() && "ring-primary ring-2"
                            )}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>

                {showImageUpload && (
                    <div className="flex items-center gap-1 ml-1 border-l border-black/5 pl-2">
                        {hasImage ? (
                            <button
                                onClick={onImageRemove}
                                className="p-1 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                title="Remove Background Image"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                        ) : (
                            <button
                                onClick={onImageUpload}
                                className="p-1 text-gray-400 hover:text-primary hover:bg-white rounded-md transition-all shadow-sm active:scale-90"
                                title="Upload Background Image"
                            >
                                <ImagePlus size={12} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export const EditorToolbar = () => {
    const {
        templateId,
        aspectRatio,
        setAspectRatio,
        showReadabilityGradient,
        setShowReadabilityGradient,
        isLogoDraggable,
        setIsLogoDraggable,
        reset,
        textAlign,
        setTextAlign,
        templateStyles,
        setFontWeight,
        applyVibe,
        userTier,
        autoFontSize,
        setAutoFontSize,
        primaryColor,
        textColor,
        backgroundColor,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        recentBackgrounds,
        recentTexts,
        recentAccents,
        extractedColors,
        addOverlay,
        resetCurrentTemplate,
        mainImage,
        setMainImage
    } = useStore()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [showStickerLibrary, setShowStickerLibrary] = useState(false)
    const [activeTab, setActiveTab] = useState('favorites')
    const [searchQuery, setSearchQuery] = useState('')
    const popoverRef = useRef<HTMLDivElement>(null)

    // Handle clicking outside to close popover
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setShowStickerLibrary(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleAddText = () => {
        addOverlay({
            type: 'text',
            content: 'New Text',
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: '#FFFFFF'
        })
    }

    const handleImageUploadTrigger = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result) {
                setMainImage(event.target.result as string)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleAddSticker = (emoji: string) => {
        addOverlay({
            type: 'sticker',
            content: emoji,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: undefined
        })
        setShowStickerLibrary(false)
    }

    const displayedEmojis = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return EMOJI_CATEGORIES.find(c => c.id === activeTab)?.emojis || []
        }
        const query = searchQuery.toLowerCase()
        return EMOJI_CATEGORIES
            .filter(cat => cat.label.toLowerCase().includes(query) || cat.id.includes(query))
            .flatMap(cat => cat.emojis)
    }, [searchQuery, activeTab])

    const fontWeight = templateStyles[templateId]?.fontWeight || 'bold'

    return (
        <div className="flex flex-col gap-2 w-full mb-6 max-w-2xl mx-auto px-4 lg:px-0">
            {/* Row 1: Framing & Vibes + Design Hub */}
            <div className="flex items-center bg-white/70 backdrop-blur-md px-1 py-1 lg:px-2 rounded-2xl border border-black/5 shadow-sm group">
                <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 px-3 py-1 lg:px-4 pr-10 lg:pr-12 md:pr-14">
                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl shrink-0">
                        {(['1:1', '4:5', '9:16'] as const)
                            .filter(ratio => templateId === 'PublicNotice' ? ratio !== '1:1' : true)
                            .map((ratio) => (
                                <button
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1 rounded-lg transition-all font-black text-[10px] tracking-tight uppercase",
                                        aspectRatio === ratio ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    {ratio === '1:1' && <Square size={10} strokeWidth={3} />}
                                    {ratio === '4:5' && <Smartphone size={10} strokeWidth={3} className="rotate-90" />}
                                    {ratio === '9:16' && <Smartphone size={10} strokeWidth={3} />}
                                    {ratio}
                                </button>
                            ))}
                    </div>

                    <div className="w-px h-4 bg-gray-200 shrink-0 mx-[-4px]" />

                    <div className="flex items-center gap-2 shrink-0">
                        {[
                            { name: 'Good News', icon: '👍' },
                            { name: 'Bad News', icon: '🚨' },
                            { name: 'Official', icon: '⚖️' },
                            { name: 'Meme', icon: '🤪' },
                        ].map((vibe) => (
                            <button
                                key={vibe.name}
                                onClick={() => applyVibe(vibe.name)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100/80 hover:bg-white hover:shadow-sm transition-all text-sm border border-transparent hover:border-black/5"
                                title={vibe.name}
                            >
                                {vibe.icon}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-4 bg-gray-200 shrink-0 mx-[-4px]" />

                    {/* Design Hub Tools */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleAddText}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 hover:bg-white hover:shadow-sm transition-all rounded-xl border border-transparent hover:border-black/5 group/btn"
                        >
                            <Type size={12} className="text-gray-400 group-hover/btn:text-primary transition-colors" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Text</span>
                        </button>

                        <div className="relative" ref={popoverRef}>
                            <button
                                onClick={() => setShowStickerLibrary(!showStickerLibrary)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 transition-all rounded-xl border border-transparent group/btn",
                                    showStickerLibrary ? "bg-primary text-white shadow-md" : "bg-gray-100/80 hover:bg-white hover:shadow-sm hover:border-black/5 text-gray-500"
                                )}
                            >
                                <Smile size={12} className={cn("transition-colors", showStickerLibrary ? "text-white" : "text-gray-400 group-hover/btn:text-primary")} />
                                <span className={cn("text-[8px] lg:text-[9px] font-black uppercase tracking-widest", showStickerLibrary ? "text-white" : "text-gray-500")}>Stickers</span>
                            </button>

                            {showStickerLibrary && (
                                <div className="absolute top-full left-0 mt-2 w-[calc(100vw-48px)] lg:w-[280px] bg-white rounded-2xl shadow-2xl border border-black/5 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                                    <div className="p-3 bg-gray-50/50 border-b border-gray-100 space-y-2">
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search emojis..."
                                                className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                                autoFocus
                                            />
                                        </div>

                                        {!searchQuery && (
                                            <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
                                                {EMOJI_CATEGORIES.map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setActiveTab(cat.id)}
                                                        className={cn(
                                                            "px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all whitespace-nowrap",
                                                            activeTab === cat.id ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-200"
                                                        )}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-[200px] overflow-y-auto p-2 grid grid-cols-5 lg:grid-cols-6 gap-1 custom-scrollbar">
                                        {displayedEmojis.map((emoji, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAddSticker(emoji)}
                                                className="aspect-square flex items-center justify-center text-2xl lg:text-xl hover:bg-gray-100 rounded-lg transition-transform active:scale-90"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-3 lg:px-4 shrink-0 bg-white/50 backdrop-blur-sm rounded-r-2xl border-l border-black/5 flex items-center justify-center h-full group-hover:bg-white transition-colors duration-300">
                    <button
                        onClick={resetCurrentTemplate}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors hover:bg-white rounded-lg border border-transparent hover:border-black/5 flex items-center justify-center shrink-0"
                        title="Reset current design (reverts colors and text)"
                    >
                        <Trash2 size={13} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* Row 2: Typography & Toggles */}
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md px-4 lg:px-5 py-2 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-4 shrink-0">
                    {/* Alignment */}
                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl">
                        {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                                key={align}
                                onClick={() => setTextAlign(align)}
                                className={cn(
                                    "p-1.5 rounded-lg transition-all",
                                    textAlign === align ? "bg-white text-primary shadow-sm" : "text-gray-400"
                                )}
                            >
                                {align === 'left' && <AlignLeft size={12} />}
                                {align === 'center' && <AlignCenter size={12} />}
                                {align === 'right' && <AlignRight size={12} />}
                            </button>
                        ))}
                    </div>

                    {/* Weight */}
                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl">
                        {(['normal', 'bold', 'black'] as const).map((w) => (
                            <button
                                key={w}
                                onClick={() => setFontWeight(w)}
                                className={cn(
                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight transition-all",
                                    fontWeight === w ? "bg-white text-primary shadow-sm" : "text-gray-400"
                                )}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Smart Fit */}
                    <button
                        onClick={() => userTier === 'pro' && setAutoFontSize(!autoFontSize)}
                        className="flex items-center gap-2 group"
                        title={userTier === 'free' ? "Pro Feature: Smart Fitting" : "Toggle Smart Text Fitting"}
                    >
                        <div className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            autoFontSize ? "bg-primary text-white" : "bg-gray-200/80 text-gray-400"
                        )}>
                            <Sparkles size={12} className={cn(autoFontSize && "animate-pulse")} />
                        </div>
                        <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest transition-colors whitespace-nowrap",
                            autoFontSize ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
                        )}>
                            Smart Fit
                        </span>
                    </button>

                    <div className="w-px h-4 bg-gray-200" />

                    <div className="flex items-center gap-4">
                        <button onClick={() => setShowReadabilityGradient(!showReadabilityGradient)} className="flex items-center gap-2 group">
                            <div className={cn("p-1.5 rounded-lg", showReadabilityGradient ? "bg-black text-white" : "bg-gray-200/80 text-gray-400")}>
                                {showReadabilityGradient ? <Eye size={12} /> : <EyeOff size={12} />}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-600 whitespace-nowrap">Contrast</span>
                        </button>

                        <button onClick={() => setIsLogoDraggable(!isLogoDraggable)} className="flex items-center gap-2 group">
                            <div className={cn("p-1.5 rounded-lg", isLogoDraggable ? "bg-primary text-white" : "bg-gray-200/80 text-gray-400")}>
                                <MousePointer2 size={12} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-600 whitespace-nowrap">Drag Logo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Row 3: Color Controls */}
            <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md px-1 py-1 lg:px-2 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 lg:gap-3 w-full shrink-0">
                    <ToolbarColorPicker
                        label="BG"
                        value={backgroundColor}
                        onChange={setBackgroundColor}
                        icon={Layers}
                        recentColors={recentBackgrounds}
                        smartColors={extractedColors}
                        userTier={userTier}
                        showImageUpload
                        onImageUpload={handleImageUploadTrigger}
                        onImageRemove={() => setMainImage(null)}
                        hasImage={!!mainImage}
                    />
                    <ToolbarColorPicker
                        label="Text"
                        value={textColor}
                        onChange={setTextColor}
                        icon={Palette}
                        recentColors={recentTexts}
                        smartColors={extractedColors}
                        userTier={userTier}
                    />
                    <ToolbarColorPicker
                        label="Accent"
                        value={primaryColor}
                        onChange={setPrimaryColor}
                        icon={Pipette}
                        recentColors={recentAccents}
                        smartColors={extractedColors}
                        userTier={userTier}
                    />
                </div>
            </div>
            <input
                ref={fileInputRef}
                id="bg-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                title="Upload background image"
            />
        </div>
    )
}
