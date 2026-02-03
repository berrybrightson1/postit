'use client'

import React from 'react'
import { useStore, TemplateId } from '@/lib/store'
import { Newspaper, FileText, Quote as QuoteIcon, Trophy, MessageSquare, Layout, Sparkles, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LockOverlay } from '../common/LockOverlay'

type Category = 'News' | 'Notice' | 'Quote' | 'Special'

const categories: { id: Category; name: string; icon: any }[] = [
    { id: 'News', name: 'News', icon: Newspaper },
    { id: 'Notice', name: 'Notice', icon: FileText },
    { id: 'Quote', name: 'Quote', icon: QuoteIcon },
    { id: 'Special', name: 'Special', icon: Sparkles },
]

const variations: Record<Category, { id: TemplateId; name: string; isPremium?: boolean }[]> = {
    News: [
        { id: 'BreakingNews', name: 'Classic' },
        { id: 'News_2', name: 'Modern', isPremium: true },
        { id: 'News_3', name: 'Ticker', isPremium: true },
        { id: 'News_4', name: 'Impact', isPremium: true },
        { id: 'News_5', name: 'Grid', isPremium: true },
    ],
    Notice: [
        { id: 'PublicNotice', name: 'Official' },
        { id: 'Notice_2', name: 'Compact', isPremium: true },
        { id: 'Notice_3', name: 'Warning', isPremium: true },
        { id: 'Notice_4', name: 'Editorial', isPremium: true },
        { id: 'Notice_5', name: 'Minimal', isPremium: true },
    ],
    Quote: [
        { id: 'ViralQuote', name: 'Viral' },
        { id: 'Quote_2', name: 'Elegant', isPremium: true },
        { id: 'Quote_3', name: 'Poster', isPremium: true },
        { id: 'Quote_4', name: 'Social', isPremium: true },
        { id: 'Quote_5', name: 'Bold', isPremium: true },
    ],
    Special: [
        { id: 'SportsScore', name: 'Sports', isPremium: true },
        { id: 'TwitterStyle', name: 'X-Style', isPremium: true },
        { id: 'MagazineCover', name: 'Cover', isPremium: true },
    ]
}

export const TemplateSelector = () => {
    const { templateId, setTemplateId, userTier } = useStore()
    const [activeCategory, setActiveCategory] = React.useState<Category>('News')
    const [isExpanded, setIsExpanded] = React.useState(false)

    // Find current category based on templateId
    React.useEffect(() => {
        for (const [cat, variants] of Object.entries(variations)) {
            if (variants.some(v => v.id === templateId)) {
                setActiveCategory(cat as Category)
                break
            }
        }
    }, [templateId])

    const getCategoryColor = (cat: Category) => {
        switch (cat) {
            case 'News': return 'bg-blue-600'
            case 'Notice': return 'bg-amber-500'
            case 'Quote': return 'bg-purple-600'
            case 'Special': return 'bg-rose-500'
            default: return 'bg-primary'
        }
    }

    const getCategoryBorder = (cat: Category) => {
        switch (cat) {
            case 'News': return 'border-blue-600'
            case 'Notice': return 'border-amber-500'
            case 'Quote': return 'border-purple-600'
            case 'Special': return 'border-rose-500'
            default: return 'border-primary'
        }
    }

    const getCategoryShadow = (cat: Category) => {
        switch (cat) {
            case 'News': return 'shadow-blue-600/20'
            case 'Notice': return 'shadow-amber-500/20'
            case 'Quote': return 'shadow-purple-600/20'
            case 'Special': return 'shadow-rose-500/20'
            default: return 'shadow-primary/20'
        }
    }

    const getCategoryColorLight = (cat: Category) => {
        switch (cat) {
            case 'News': return 'bg-blue-50/50'
            case 'Notice': return 'bg-amber-50/50'
            case 'Quote': return 'bg-purple-50/50'
            case 'Special': return 'bg-rose-50/50'
            default: return 'bg-gray-50/50'
        }
    }

    const getCategoryText = (cat: Category) => {
        switch (cat) {
            case 'News': return 'text-blue-600'
            case 'Notice': return 'text-amber-600'
            case 'Quote': return 'text-purple-600'
            case 'Special': return 'text-rose-600'
            default: return 'text-primary'
        }
    }

    return (
        <div className="flex flex-col gap-8 py-1">
            {/* Integrated Category Grid - ALWAYS VISIBLE */}
            <div className="grid grid-cols-2 gap-4 px-1">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id
                    const colorClass = getCategoryColor(cat.id)

                    return (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id)
                                setIsExpanded(true)
                                // Auto-select the first variation of the selected category
                                const firstVariation = variations[cat.id][0]
                                if (firstVariation) {
                                    setTemplateId(firstVariation.id)
                                }
                            }}
                            className={cn(
                                "flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-2",
                                isActive
                                    ? cn(colorClass, "text-white border-transparent shadow-2xl scale-[1.03]")
                                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-900"
                            )}
                        >
                            <cat.icon size={15} />
                            {cat.name}
                        </button>
                    )
                })}
            </div>

            <div className="flex flex-col mt-10 px-1">
                {/* Design Library Trigger Bar - PILL STYLE */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "flex items-center justify-between px-7 py-5 rounded-[24px] border-2 transition-all duration-500 group",
                        isExpanded
                            ? "bg-gray-900 border-transparent shadow-2xl scale-[1.02]"
                            : "bg-white border-gray-100 hover:border-gray-300"
                    )}
                >
                    <div className="flex items-center gap-5">
                        <div className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-500",
                            isExpanded ? "bg-white/10" : "bg-gray-50"
                        )}>
                            <div className={cn("w-2 h-2 rounded-full animate-pulse shadow-lg", getCategoryColor(activeCategory))} />
                        </div>
                        <span className={cn(
                            "text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-500",
                            isExpanded ? "text-white" : "text-gray-900 opacity-40 group-hover:opacity-100"
                        )}>
                            Variations // {activeCategory}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <ChevronDown
                            size={18}
                            className={cn(
                                "transition-all duration-700 ease-out",
                                isExpanded ? "rotate-180 text-white" : "text-gray-300"
                            )}
                        />
                    </div>
                </button>

                {/* Collapsible Content Area - TEMPLATES ONLY */}
                <div className={cn(
                    "grid overflow-hidden transition-all duration-700 ease-in-out",
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 pt-8 pb-20 px-4">
                            {variations[activeCategory].map((v) => {
                                const isSelected = templateId === v.id
                                const isLocked = !!v.isPremium && userTier === 'free'
                                const colorClass = getCategoryColor(activeCategory)
                                const borderClass = getCategoryBorder(activeCategory)
                                const shadowClass = getCategoryShadow(activeCategory)
                                const lightBgClass = getCategoryColorLight(activeCategory)
                                const textColorClass = getCategoryText(activeCategory)

                                return (
                                    <LockOverlay
                                        key={v.id}
                                        isLocked={isLocked}
                                        message="PRO"
                                    >
                                        <button
                                            onClick={() => {
                                                setTemplateId(v.id)
                                                setIsExpanded(false)
                                            }}
                                            disabled={isLocked}
                                            className={cn(
                                                "group relative flex flex-col gap-4 p-3 rounded-[32px] transition-all duration-500 border-2 text-left w-full",
                                                isSelected
                                                    ? cn("bg-white z-10", borderClass, shadowClass)
                                                    : "bg-white border-gray-100/50 hover:border-gray-200"
                                            )}
                                        >
                                            {/* Thumbnail Container */}
                                            <div className={cn(
                                                "aspect-square rounded-[24px] overflow-hidden relative transition-all duration-700",
                                                isSelected ? lightBgClass : "bg-gray-50/50"
                                            )}>
                                                <div className="absolute inset-0 flex flex-col p-6 items-center justify-center">
                                                    <div className={cn(
                                                        "w-full aspect-[4/3] rounded-xl mb-4 shadow-lg transition-all duration-700 scale-90",
                                                        isSelected ? colorClass : "bg-gray-200"
                                                    )} />
                                                    <div className="w-full flex flex-col gap-2 px-2">
                                                        <div className={cn("h-2 w-full rounded-full opacity-20", isSelected ? colorClass : "bg-gray-200")} />
                                                        <div className={cn("h-2 w-2/3 rounded-full opacity-20", isSelected ? colorClass : "bg-gray-200")} />
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <div className={cn("absolute top-4 right-4 text-white p-1.5 rounded-full shadow-lg", colorClass)}>
                                                        <Layout size={14} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="px-2 py-1 flex flex-col gap-2">
                                                <span className={cn(
                                                    "text-[13px] font-black uppercase tracking-wider transition-colors duration-500",
                                                    isSelected ? "text-gray-900" : "text-gray-400"
                                                )}>
                                                    {v.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-2 h-2 rounded-full transition-all duration-500", isSelected ? colorClass : "bg-gray-200")} />
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-[0.15em] transition-opacity duration-500",
                                                        isSelected ? textColorClass : "text-gray-300"
                                                    )}>
                                                        {activeCategory}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    </LockOverlay>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
