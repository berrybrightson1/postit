'use client'

import React, { useState, useRef } from 'react'
import { useStore, type AspectRatio } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
    Square, Smartphone, Eye, EyeOff, MousePointer2,
    Trash2, AlignLeft, AlignCenter, AlignRight,
    Sparkles, Pipette, Layers, Palette, Hash,
    Type, Smile, Search, ImagePlus, X, Link2, Loader2, RotateCcw, RotateCw,
    Bold, Italic, Underline, UserRound
} from 'lucide-react'
import { UndoRedoControls } from './UndoRedoControls'
import { ToolbarColorPicker } from './shared/ToolbarColorPicker'
import { FontPicker } from './FontPicker'
import { BrandedSelect } from './BrandedSelect'
import { EMOJI_CATEGORIES } from '@/lib/constants'
import { fontWeightMap } from '@/lib/utils'

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

// Editor Toolbar Component

export const EditorToolbar = () => {
    const {
        templateId,
        aspectRatio,
        setAspectRatio,
        showReadabilityGradient,
        setShowReadabilityGradient,
        reset,
        textAlign,
        setTextAlign,
        templateStyles,
        setFontWeight,
        fontStyle,
        setFontStyle,
        textDecoration,
        setTextDecoration,
        applyVibe,
        userTier,
        primaryColor,
        textColor,
        backgroundColor,
        setPrimaryColor,
        setTextColor,
        setBackgroundColor,
        setProfileImage,
        recentBackgrounds,
        recentTexts,
        recentAccents,
        extractedColors,
        addOverlay,
        mainImage,
        setMainImage,
        isScraping,
        generateFromLink,
        isDragMode,
        setIsDragMode,
        fontFamily,
        setFontFamily,
        setBodySize,
        profileImage
    } = useStore()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const profileInputRef = useRef<HTMLInputElement>(null)

    const [showStickerLibrary, setShowStickerLibrary] = useState(false)
    const [activeTab, setActiveTab] = useState('favorites')
    const [searchQuery, setSearchQuery] = useState('')
    const [socialUrl, setSocialUrl] = useState('')
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

    const handleProfileUploadTrigger = () => {
        profileInputRef.current?.click()
    }

    const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result) {
                setProfileImage(event.target.result as string)
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

    const isSpecialTemplate = ['TwitterStyle', 'InstagramPost', 'FacebookPost', 'YouTubeThumbnail'].includes(templateId)

    const handleSocialGenerate = async () => {
        if (!socialUrl) return
        await generateFromLink(socialUrl)
        setSocialUrl('')
    }

    const getSocialConfig = () => {
        switch (templateId) {
            case 'TwitterStyle': return { name: 'X', placeholder: 'Paste X (Twitter) link here...' }
            case 'FacebookPost': return { name: 'Facebook', placeholder: 'Paste Facebook link here...' }
            case 'InstagramPost': return { name: 'Instagram', placeholder: 'Paste Instagram link here...' }
            case 'YouTubeThumbnail': return { name: 'YouTube', placeholder: 'Paste YouTube video link here...' }
            default: return { name: 'Social', placeholder: 'Paste social link here...' }
        }
    }

    const socialConfig = getSocialConfig()

    return (
        <div className="flex flex-col gap-2 w-full mb-6 max-w-2xl mx-auto px-4 lg:px-0">
            {/* Row 1: Framing & Vibes + Design Hub */}
            <div className="relative z-50 flex items-center bg-white/70 backdrop-blur-md p-1 lg:p-2 rounded-2xl border border-black/5 shadow-sm group">
                <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-4 px-3 py-1 lg:px-4 pr-6">
                    <div className="flex items-center gap-1 p-1 h-9 bg-gray-100/80 rounded-2xl shrink-0">
                        {(['1:1', '4:5', '9:16', '16:9'] as const)
                            .filter(ratio => {
                                if (templateId === 'YouTubeThumbnail') return ratio === '16:9'
                                if (templateId === 'PublicNotice') return ratio !== '1:1'
                                if (isSpecialTemplate && ratio === '9:16') return false
                                if (ratio === '16:9') return false
                                return true
                            })
                            .map((ratio) => (
                                <button
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 h-full rounded-xl transition-all font-black text-[10px] tracking-tight uppercase",
                                        aspectRatio === ratio ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    {ratio === '1:1' && <Square size={10} strokeWidth={3} />}
                                    {ratio === '4:5' && <Smartphone size={10} strokeWidth={3} className="rotate-90" />}
                                    {ratio === '9:16' && <Smartphone size={10} strokeWidth={3} />}
                                    {ratio === '16:9' && <Smartphone size={10} strokeWidth={3} className="rotate-90" />}
                                    {ratio}
                                </button>
                            ))}
                    </div>

                    <div className="w-px h-4 bg-gray-200 shrink-0 mx-[-4px]" />

                    <div className="flex items-center gap-1.5 p-1 h-9 bg-gray-100/80 rounded-2xl shrink-0">
                        <div className="flex items-center gap-1 h-full">
                            <button
                                onClick={handleImageUploadTrigger}
                                className="flex items-center gap-2 px-3 h-full hover:bg-white hover:text-primary hover:shadow-sm transition-all rounded-xl text-gray-500 group/btn"
                            >
                                <ImagePlus size={12} strokeWidth={3} className="text-gray-400 group-hover/btn:text-primary transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">BG Image</span>
                            </button>
                            {mainImage && (
                                <button
                                    onClick={() => setMainImage(null)}
                                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors aspect-square flex items-center justify-center h-full"
                                    title="Remove background image"
                                >
                                    <X size={12} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                        <div className="w-px h-4 bg-gray-300/50" />
                        <div className="flex items-center gap-1 h-full">
                            <button
                                onClick={handleProfileUploadTrigger}
                                className="flex items-center gap-2 px-3 h-full hover:bg-white hover:text-primary hover:shadow-sm transition-all rounded-xl text-gray-500 group/btn"
                            >
                                <UserRound size={12} strokeWidth={3} className="text-gray-400 group-hover/btn:text-primary transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Profile</span>
                            </button>
                            {useStore.getState().profileImage && (
                                <button
                                    onClick={() => setProfileImage(null)}
                                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors aspect-square flex items-center justify-center h-full"
                                    title="Remove profile image"
                                >
                                    <X size={12} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-px h-4 bg-gray-200 shrink-0 mx-[-4px]" />

                    <div className="flex items-center gap-1.5 p-1 h-9 bg-gray-100/80 rounded-2xl shrink-0">
                        {[
                            { name: 'Good News', icon: '👍' },
                            { name: 'Bad News', icon: '🚨' },
                            { name: 'Official', icon: '⚖️' },
                            { name: 'Meme', icon: '🤪' },
                        ].map((vibe) => (
                            <button
                                key={vibe.name}
                                onClick={() => applyVibe(vibe.name)}
                                className="w-8 h-full flex items-center justify-center rounded-xl bg-transparent hover:bg-white hover:shadow-sm transition-all text-sm border border-transparent hover:border-black/5"
                                title={vibe.name}
                            >
                                {vibe.icon}
                            </button>
                        ))}
                    </div>
                </div>


            </div>

            {/* Row 2: Typography & Alignment */}
            <div className="relative z-40 flex items-center bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <div className="w-40">
                        <FontPicker
                            value={fontFamily}
                            onChange={setFontFamily}
                            userTier={userTier}
                        />
                    </div>
                </div>

                <div className="w-px h-6 bg-gray-200 shrink-0 mx-1" />

                <div className="flex items-center gap-2 px-2 shrink-0">
                    <div className="w-28">
                        <BrandedSelect
                            value={fontWeight}
                            onChange={setFontWeight}
                            options={Object.keys(fontWeightMap).map(w => ({ label: w, value: w }))}
                            placeholder="Weight"
                        />
                    </div>
                    <div className="w-20">
                        <BrandedSelect
                            value={Math.round((templateStyles[templateId]?.bodySize || 1) * 24)}
                            onChange={(pt) => setBodySize(pt / 24)}
                            options={FONT_SIZES.map(s => ({ label: `${s}`, value: s }))}
                            placeholder="Size"
                        />
                    </div>
                </div>

                <div className="w-px h-6 bg-gray-200 shrink-0 mx-1" />

                <div className="flex items-center gap-1.5 p-1 h-9 bg-gray-100/80 rounded-xl shrink-0">
                    <button
                        onClick={() => setTextAlign('left')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", textAlign === 'left' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Align Left"
                    >
                        <AlignLeft size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => setTextAlign('center')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", textAlign === 'center' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Align Center"
                    >
                        <AlignCenter size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => setTextAlign('right')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", textAlign === 'right' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Align Right"
                    >
                        <AlignRight size={14} strokeWidth={3} />
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-200 shrink-0 mx-1" />

                <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 h-9 rounded-2xl shrink-0">
                    <button
                        onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", fontWeight === 'bold' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Bold"
                    >
                        <Bold size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", fontStyle === 'italic' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Italic"
                    >
                        <Italic size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => setTextDecoration(textDecoration === 'underline' ? 'none' : 'underline')}
                        className={cn("p-2 h-full aspect-square flex items-center justify-center rounded-xl transition-all", textDecoration === 'underline' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600")}
                        title="Underline"
                    >
                        <Underline size={14} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* Row 3: Styling (Accent & Text) */}
            <div className="relative z-30 flex items-center bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <ToolbarColorPicker
                        label="Accent"
                        value={primaryColor}
                        onChange={setPrimaryColor}
                        recentColors={recentAccents}
                        smartColors={extractedColors}
                        userTier={userTier}
                        icon={Palette}
                    />
                    <ToolbarColorPicker
                        label="Text"
                        value={textColor}
                        onChange={setTextColor}
                        recentColors={recentTexts}
                        smartColors={extractedColors}
                        userTier={userTier}
                        icon={Type}
                    />
                    <ToolbarColorPicker
                        label="Canvas"
                        value={backgroundColor}
                        onChange={setBackgroundColor}
                        recentColors={[]}
                        smartColors={[]}
                        userTier={userTier}
                        icon={Layers}
                    />
                </div>
            </div>

            {/* Row 4: Navigation, View & Elements */}
            <div className="relative z-30 flex items-center bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar gap-2">
                <div className="flex items-center gap-1.5 p-1 h-9 bg-gray-100/80 rounded-xl shrink-0">
                    <button
                        onClick={handleAddText}
                        className="flex items-center gap-2 px-3 h-full hover:bg-white hover:text-primary hover:shadow-sm transition-all rounded-xl text-gray-500 group/btn"
                    >
                        <Type size={12} strokeWidth={3} className="text-gray-400 group-hover/btn:text-primary transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Text</span>
                    </button>

                    <div className="relative h-full" ref={popoverRef}>
                        <button
                            onClick={() => setShowStickerLibrary(!showStickerLibrary)}
                            className={cn(
                                "flex items-center gap-2 px-3 h-full transition-all rounded-xl group/btn",
                                showStickerLibrary ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-white hover:shadow-sm text-gray-500"
                            )}
                        >
                            <Smile size={12} strokeWidth={3} className={cn("transition-colors", showStickerLibrary ? "text-white" : "text-gray-400 group-hover/btn:text-primary")} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Stickers</span>
                        </button>

                        {showStickerLibrary && (
                            <div className="absolute top-full left-0 mt-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-black/5 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                                <div className="p-3 bg-gray-50/50 border-b border-gray-100 space-y-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search emojis..."
                                            className="w-full bg-white border border-gray-200 rounded-xl py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
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
                                                        "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all whitespace-nowrap",
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
                                            className="aspect-square flex items-center justify-center text-2xl lg:text-xl hover:bg-gray-100 rounded-xl transition-transform active:scale-90"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 h-9 bg-gray-100/80 rounded-2xl shrink-0">
                    <button
                        onClick={() => setShowReadabilityGradient(!showReadabilityGradient)}
                        className={cn(
                            "flex items-center gap-2 px-3 h-full transition-all rounded-xl group",
                            showReadabilityGradient ? "bg-black text-white shadow-sm" : "hover:bg-white text-gray-500 hover:text-gray-800"
                        )}
                    >
                        <Eye size={12} strokeWidth={3} className={cn("transition-colors", showReadabilityGradient ? "text-white" : "text-gray-400 group-hover:text-gray-800")} />
                        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Contrast</span>
                    </button>

                    <button
                        onClick={() => setIsDragMode(!isDragMode)}
                        className={cn(
                            "flex items-center gap-2 px-3 h-full transition-all rounded-xl group",
                            isDragMode ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-white text-gray-500 hover:text-gray-800"
                        )}
                    >
                        <MousePointer2 size={12} strokeWidth={3} className={cn("transition-colors", isDragMode ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Freeform</span>
                    </button>
                </div>

                <div className="w-px h-6 bg-gray-200 shrink-0 mx-1" />
                <div className="flex items-center gap-2 p-1 h-9 bg-gray-100/80 rounded-2xl shrink-0">
                    <div className="flex items-center gap-1 h-full">
                        <UndoRedoControls />
                    </div>
                    <div className="w-px h-6 bg-black/5 mx-1" />
                    <button
                        onClick={reset}
                        className="p-2 h-full aspect-square flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors hover:bg-white rounded-xl"
                        title="Reset current design"
                    >
                        <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Row 5: Social Link Generator (Special Templates ONLY) */}
            {
                isSpecialTemplate && (
                    <div className="relative z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-black/5 shadow-sm animate-in slide-in-from-top-1 duration-300">
                        <div className="flex items-center gap-2 pl-1 pr-2 border-r border-black/5 shrink-0">
                            <Sparkles size={12} className="text-primary animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{socialConfig.name} Auto-Gen</span>
                        </div>

                        <div className="flex-1 relative flex items-center">
                            <Link2 size={12} className="absolute left-2.5 text-gray-400" />
                            <input
                                type="text"
                                value={socialUrl}
                                onChange={(e) => setSocialUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSocialGenerate()}
                                placeholder={socialConfig.placeholder}
                                className="w-full bg-gray-100/50 border border-transparent rounded-xl py-1.5 pl-8 pr-3 text-[11px] focus:bg-white focus:border-primary/20 focus:outline-none transition-all"
                                disabled={isScraping}
                                title={`Paste ${socialConfig.name} link`}
                            />
                        </div>

                        <button
                            onClick={handleSocialGenerate}
                            disabled={!socialUrl || isScraping}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-wider shrink-0",
                                isScraping || !socialUrl
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-primary text-white shadow-md active:scale-95 hover:shadow-primary/20"
                            )}
                        >
                            {isScraping ? (
                                <>
                                    <Loader2 size={12} className="animate-spin" />
                                    <span>Wait...</span>
                                </>
                            ) : (
                                <span>Generate</span>
                            )}
                        </button>
                    </div>
                )
            }

            <input
                ref={fileInputRef}
                id="bg-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                title="Upload background image"
                placeholder="Upload background image"
            />
            <input
                ref={profileInputRef}
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileFileChange}
                title="Upload profile image"
            />
        </div>
    )
}
