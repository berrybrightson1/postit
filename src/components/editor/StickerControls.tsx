'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { Type, Smile, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EMOJI_CATEGORIES } from '@/lib/constants'

export const StickerControls = () => {
    const { addOverlay, primaryColor } = useStore()
    const [activeTab, setActiveTab] = React.useState('favorites')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showLibrary, setShowLibrary] = React.useState(false)

    const handleAddSticker = (emoji: string) => {
        addOverlay({
            type: 'sticker',
            content: emoji,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: undefined // Emojis don't need color
        })
    }

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

    // Filter emojis based on search query
    const displayedEmojis = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return EMOJI_CATEGORIES.find(c => c.id === activeTab)?.emojis || []
        }

        const query = searchQuery.toLowerCase()
        return EMOJI_CATEGORIES
            .filter(cat => cat.label.toLowerCase().includes(query) || cat.id.includes(query))
            .flatMap(cat => cat.emojis)
    }, [searchQuery, activeTab])

    return (
        <div className="flex flex-col gap-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={handleAddText}
                    className="flex items-center justify-center gap-2 p-3 bg-gray-50 border border-black/5 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                >
                    <Type size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Add Text</span>
                </button>
                <button
                    onClick={() => setShowLibrary(!showLibrary)}
                    className={cn(
                        "flex items-center justify-center gap-2 p-3 border border-black/5 rounded-xl transition-all group",
                        showLibrary ? "bg-primary text-white shadow-md border-transparent" : "bg-gray-50 hover:bg-white hover:shadow-md text-gray-600"
                    )}
                >
                    <Smile size={16} className={cn("transition-colors", showLibrary ? "text-white" : "text-gray-500 group-hover:text-primary")} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Stickers</span>
                </button>
            </div>

            {/* Sticker Library */}
            {showLibrary && (
                <div className="pill-container !p-0 overflow-hidden flex flex-col h-[300px] animate-in slide-in-from-top-2 duration-200">
                    {/* Header with Search */}
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50 space-y-3">
                        <div className="flex items-center gap-2">
                            <Smile size={14} className="text-gray-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sticker Library</span>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <Search size={12} className="text-gray-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find stickers..."
                                className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-8 pr-2 text-base focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-300"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Tabs - Only show if not searching (Limited to top 3) */}
                    {!searchQuery && (
                        <div className="flex overflow-x-auto border-b border-gray-100 no-scrollbar">
                            {EMOJI_CATEGORIES.filter(c => ['favorites', 'faces', 'hearts'].includes(c.id)).map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={cn(
                                        "px-3 py-2 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors",
                                        activeTab === cat.id
                                            ? "text-primary border-b-2 border-primary bg-primary/5"
                                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                        {displayedEmojis.length > 0 ? (
                            <div className="grid grid-cols-5 gap-2">
                                {displayedEmojis.map((emoji, index) => (
                                    <button
                                        key={`${searchQuery || activeTab}-${index}`}
                                        onClick={() => handleAddSticker(emoji)}
                                        className="aspect-square flex items-center justify-center text-2xl hover:scale-125 transition-transform cursor-pointer rounded-md hover:bg-gray-100 active:scale-95"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-2">
                                <Search size={24} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">No Stickers Found</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
