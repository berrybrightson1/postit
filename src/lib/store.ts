import React from 'react'
import { create } from 'zustand'

export type TemplateId =
    | 'News_1' | 'News_2' | 'News_3' | 'News_4' | 'News_5'
    | 'Notice_1' | 'Notice_2' | 'Notice_3' | 'Notice_4' | 'Notice_5'
    | 'Quote_1' | 'Quote_2' | 'Quote_3' | 'Quote_4' | 'Quote_5'
    | 'SportsScore' | 'TwitterStyle' | 'MagazineCover'
    | 'BreakingNews' // Legacy/Alias for News_1
    | 'PublicNotice' // Legacy/Alias for Notice_1
    | 'ViralQuote'   // Legacy/Alias for Quote_1
export type AspectRatio = '1:1' | '9:16' | '4:5'
export type FontFamily = 'Inter' | 'Playfair Display' | 'Space Grotesk' | 'Outfit' | 'Bebas Neue'

interface TemplateStyle {
    primaryColor: string
    textColor: string
    backgroundColor: string
    aspectRatio: AspectRatio
    backdropPosition: string
    bodySize: number
    lineHeight: number
    letterSpacing: number
    // Typography
    fontWeight: 'normal' | 'bold' | 'black'
    fontFamily: FontFamily
}

export type OverlayType = 'text' | 'sticker' | 'image'

export interface OverlayItem {
    id: string
    type: OverlayType
    content: string
    x: number
    y: number
    scale: number
    rotation: number
    color?: string
}

interface PostitState {
    // Data
    templateId: TemplateId
    headline: string
    body: string
    footer: string
    email: string
    primaryColor: string
    textColor: string
    backgroundColor: string
    aspectRatio: AspectRatio
    mainImage: string | null
    backdropPosition: string
    logo: string | null
    brandingLine1: string
    brandingLine2: string
    showWatermark: boolean

    // Computed properties
    bodySize: number

    // Overlay State
    overlays: OverlayItem[]

    fontFamily: FontFamily
    templateStyles: Record<TemplateId, TemplateStyle>

    recentBackgrounds: string[]
    recentTexts: string[]
    recentAccents: string[]

    // Auth & Subscription (Mock)
    userTier: 'free' | 'pro'
    isAuthenticated: boolean
    user: { name: string, avatar: string } | null
    isProPanelOpen: boolean
    autoFontSize: boolean

    // Actions
    setTemplateId: (id: TemplateId) => void
    setHeadline: (text: string) => void
    setBody: (text: string) => void
    setFooter: (text: string) => void
    setEmail: (text: string) => void
    setPrimaryColor: (color: string) => void
    setTextColor: (color: string) => void
    setBackgroundColor: (color: string) => void
    setAspectRatio: (ratio: AspectRatio) => void
    setMainImage: (image: string | null) => void
    setBackdropPosition: (pos: string) => void
    setLogo: (logo: string | null) => void
    setBrandingLine1: (text: string) => void
    setBrandingLine2: (text: string) => void
    setShowWatermark: (show: boolean) => void
    setBodySize: (size: number) => void
    setUserTier: (tier: 'free' | 'pro') => void
    setAuthenticated: (auth: boolean) => void
    setUser: (user: { name: string, avatar: string } | null) => void
    setIsProPanelOpen: (open: boolean) => void
    setAutoFontSize: (auto: boolean) => void

    // Overlay Actions
    addOverlay: (item: Omit<OverlayItem, 'id'>) => void
    updateOverlay: (id: string, changes: Partial<OverlayItem>) => void
    removeOverlay: (id: string) => void

    setLineHeight: (size: number) => void
    setLetterSpacing: (size: number) => void
    setFontWeight: (weight: 'normal' | 'bold' | 'black') => void
    setFontFamily: (font: FontFamily) => void
    reset: () => void
}

export const defaultPalette = ['#3A2D9C', '#CE1126', '#006B3F', '#FCD116', '#000000', '#FFFFFF', '#E11D48']

const defaultStyles: Record<TemplateId, TemplateStyle> = {
    // News Variations
    News_1: {
        primaryColor: '#3A2D9C',
        textColor: '#FFFFFF',
        backgroundColor: '#0f172a',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.4,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },
    News_2: {
        primaryColor: '#E11D48',
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.1,
        lineHeight: 1.3,
        letterSpacing: -0.01,
        fontWeight: 'black',
        fontFamily: 'Outfit'
    },
    News_3: {
        primaryColor: '#10B981',
        textColor: '#FFFFFF',
        backgroundColor: '#064E3B',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 0.9,
        lineHeight: 1.5,
        letterSpacing: 0.02,
        fontWeight: 'normal',
        fontFamily: 'Space Grotesk'
    },
    News_4: {
        primaryColor: '#F59E0B',
        textColor: '#111827',
        backgroundColor: '#FFFBEB',
        aspectRatio: '1:1',
        backdropPosition: 'object-center',
        bodySize: 1.2,
        lineHeight: 1.2,
        letterSpacing: -0.05,
        fontWeight: 'black',
        fontFamily: 'Bebas Neue'
    },
    News_5: {
        primaryColor: '#6366F1',
        textColor: '#FFFFFF',
        backgroundColor: '#1E1B4B',
        aspectRatio: '9:16',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.4,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },

    // Notice Variations
    Notice_1: {
        primaryColor: '#000000',
        textColor: '#111827',
        backgroundColor: '#FFFFFF',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.6,
        letterSpacing: 0,
        fontWeight: 'normal',
        fontFamily: 'Inter'
    },
    Notice_2: {
        primaryColor: '#2563EB',
        textColor: '#FFFFFF',
        backgroundColor: '#EFF6FF',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.1,
        lineHeight: 1.4,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontFamily: 'Outfit'
    },
    Notice_3: {
        primaryColor: '#D97706',
        textColor: '#111827',
        backgroundColor: '#FEF3C7',
        aspectRatio: '1:1',
        backdropPosition: 'object-center',
        bodySize: 0.9,
        lineHeight: 1.7,
        letterSpacing: 0.05,
        fontWeight: 'normal',
        fontFamily: 'Space Grotesk'
    },
    Notice_4: {
        primaryColor: '#4F46E5',
        textColor: '#FFFFFF',
        backgroundColor: '#EEF2FF',
        aspectRatio: '9:16',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.5,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontFamily: 'Playfair Display'
    },
    Notice_5: {
        primaryColor: '#7C3AED',
        textColor: '#FFFFFF',
        backgroundColor: '#F5F3FF',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.2,
        lineHeight: 1.3,
        letterSpacing: -0.02,
        fontWeight: 'black',
        fontFamily: 'Outfit'
    },

    // Quote Variations
    Quote_1: {
        primaryColor: '#E11D48',
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.2,
        lineHeight: 1.3,
        letterSpacing: -0.02,
        fontWeight: 'black',
        fontFamily: 'Inter'
    },
    Quote_2: {
        primaryColor: '#F472B6',
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
        aspectRatio: '1:1',
        backdropPosition: 'object-center',
        bodySize: 1.3,
        lineHeight: 1.2,
        letterSpacing: -0.04,
        fontWeight: 'black',
        fontFamily: 'Playfair Display'
    },
    Quote_3: {
        primaryColor: '#8B5CF6',
        textColor: '#FFFFFF',
        backgroundColor: '#1E1B4B',
        aspectRatio: '9:16',
        backdropPosition: 'object-center',
        bodySize: 1.1,
        lineHeight: 1.4,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontFamily: 'Space Grotesk'
    },
    Quote_4: {
        primaryColor: '#10B981',
        textColor: '#FFFFFF',
        backgroundColor: '#064E3B',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.5,
        letterSpacing: 0.02,
        fontWeight: 'normal',
        fontFamily: 'Outfit'
    },
    Quote_5: {
        primaryColor: '#F97316',
        textColor: '#FFFFFF',
        backgroundColor: '#262626',
        aspectRatio: '4:5',
        backdropPosition: 'object-center',
        bodySize: 1.4,
        lineHeight: 1.1,
        letterSpacing: -0.06,
        fontWeight: 'black',
        fontFamily: 'Bebas Neue'
    },

    SportsScore: {
        primaryColor: '#FCD116',
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
        aspectRatio: '1:1',
        backdropPosition: 'object-center',
        bodySize: 1.5,
        lineHeight: 1.1,
        letterSpacing: -0.05,
        fontWeight: 'black',
        fontFamily: 'Bebas Neue'
    },
    TwitterStyle: {
        primaryColor: '#1DA1F2',
        textColor: '#000000',
        backgroundColor: '#FFFFFF',
        aspectRatio: '1:1',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.5,
        letterSpacing: 0,
        fontWeight: 'normal',
        fontFamily: 'Inter'
    },
    MagazineCover: {
        primaryColor: '#FFFFFF',
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
        aspectRatio: '9:16',
        backdropPosition: 'object-center',
        bodySize: 1.0,
        lineHeight: 1.2,
        letterSpacing: 0.1,
        fontWeight: 'bold',
        fontFamily: 'Playfair Display'
    },
    BreakingNews: { primaryColor: '#3A2D9C', textColor: '#FFFFFF', backgroundColor: '#0f172a', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Inter' },
    PublicNotice: { primaryColor: '#000000', textColor: '#111827', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.6, letterSpacing: 0, fontWeight: 'normal', fontFamily: 'Inter' },
    ViralQuote: { primaryColor: '#E11D48', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.2, lineHeight: 1.3, letterSpacing: -0.02, fontWeight: 'black', fontFamily: 'Inter' },
}

// Add fontFamily to existing defaultStyles
// This was actually already handled by the replacement above.

const initialState = {
    templateId: 'BreakingNews' as TemplateId,
    headline: 'BREAKING NEWS',
    body: 'Enter your viral story here. Make it catchy and shareable!',
    footer: 'POSTIT.APP',
    email: 'hello@postit.app',
    ...defaultStyles['BreakingNews'],
    mainImage: null,
    logo: null,
    brandingLine1: 'Create yours at:',
    brandingLine2: 'Postit.app.com',
    showWatermark: true,
    templateStyles: { ...defaultStyles },
    recentBackgrounds: [...defaultPalette],
    recentTexts: [...defaultPalette],
    recentAccents: [...defaultPalette],
    overlays: [] as OverlayItem[],
    userTier: 'free' as 'free' | 'pro',
    isAuthenticated: false,
    user: null as { name: string, avatar: string } | null,
    isProPanelOpen: false,
    autoFontSize: true,
}

import { persist } from 'zustand/middleware'
import { temporal } from 'zundo'

export const useStore = create<PostitState>()(
    temporal(
        persist(
            (set, get) => ({
                ...initialState,

                // Computed getter for bodySize from current template
                get bodySize() {
                    const state = get()
                    if (!state || !state.templateStyles || !state.templateId) return 1.0
                    return state.templateStyles[state.templateId]?.bodySize ?? 1.0
                },

                setTemplateId: (templateId) => {
                    const { templateStyles } = get()
                    const style = templateStyles[templateId]
                    set({
                        templateId,
                        ...style
                    })
                },
                setHeadline: (headline) => set({ headline }),
                setBody: (body) => set({ body }),
                setFooter: (footer) => set({ footer }),
                setEmail: (email) => set({ email }),
                setPrimaryColor: (primaryColor) => {
                    const { templateId, templateStyles } = get()
                    const { addRecentColor } = getHelpers(set, get)
                    addRecentColor('recentAccents', primaryColor)

                    set({
                        primaryColor,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], primaryColor }
                        }
                    })
                },
                setTextColor: (textColor) => {
                    const { templateId, templateStyles } = get()
                    const { addRecentColor } = getHelpers(set, get)
                    addRecentColor('recentTexts', textColor)

                    set({
                        textColor,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], textColor }
                        }
                    })
                },
                setBackgroundColor: (backgroundColor) => {
                    const { templateId, templateStyles } = get()
                    const { addRecentColor } = getHelpers(set, get)
                    addRecentColor('recentBackgrounds', backgroundColor)

                    set({
                        backgroundColor,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], backgroundColor }
                        }
                    })
                },
                setAspectRatio: (aspectRatio) => {
                    const { templateId, templateStyles } = get()
                    set({
                        aspectRatio,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], aspectRatio }
                        }
                    })
                },
                setMainImage: (mainImage) => set({ mainImage }),
                setBackdropPosition: (backdropPosition) => {
                    const { templateId, templateStyles } = get()
                    set({
                        backdropPosition,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], backdropPosition }
                        }
                    })
                },
                setLogo: (logo) => set({ logo }),
                setBrandingLine1: (brandingLine1) => set({ brandingLine1 }),
                setBrandingLine2: (brandingLine2) => set({ brandingLine2 }),
                setShowWatermark: (showWatermark) => set({ showWatermark }),
                setBodySize: (bodySize) => {
                    const { templateId, templateStyles } = get()
                    set({
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                bodySize
                            }
                        }
                    })
                },
                setUserTier: (userTier) => set({ userTier }),
                setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
                setUser: (user) => set({ user }),
                setIsProPanelOpen: (open) => set({ isProPanelOpen: open }),
                setAutoFontSize: (auto) => set({ autoFontSize: auto }),

                // Overlay Actions
                addOverlay: (item) => {
                    const id = Math.random().toString(36).substring(2, 9)
                    set((state) => ({
                        overlays: [...state.overlays, { ...item, id }]
                    }))
                },
                updateOverlay: (id, changes) => {
                    set((state) => ({
                        overlays: state.overlays.map(o => o.id === id ? { ...o, ...changes } : o)
                    }))
                },
                removeOverlay: (id) => {
                    set((state) => ({
                        overlays: state.overlays.filter(o => o.id !== id)
                    }))
                },
                setLineHeight: (lineHeight) => {
                    const { templateId, templateStyles } = get()
                    set({
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                lineHeight
                            }
                        }
                    })
                },
                setLetterSpacing: (letterSpacing) => {
                    const { templateId, templateStyles } = get()
                    set({
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                letterSpacing
                            }
                        }
                    })
                },
                setFontWeight: (fontWeight) => {
                    const { templateId, templateStyles } = get()
                    set({
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                fontWeight
                            }
                        }
                    })
                },
                setFontFamily: (fontFamily) => {
                    const { templateId, templateStyles } = get()
                    set({
                        fontFamily,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                fontFamily
                            }
                        }
                    })
                },
                reset: () => {
                    // Clear persistence on explicit reset
                    useStore.persist.clearStorage()
                    set(initialState)
                },
            }),
            {
                name: 'postit-storage',
                onRehydrateStorage: () => {
                    console.log('Postit Storage: hydration starting')
                    return (state, error) => {
                        if (error) {
                            console.error('Postit Storage: hydration failed', error)
                        } else {
                            console.log('Postit Storage: hydration finished', state)
                        }
                    }
                },
            }
        ),
        {
            limit: 50,
            partialize: (state) => {
                if (!state) return {} as any
                const {
                    recentBackgrounds,
                    recentTexts,
                    recentAccents,
                    ...rest
                } = state
                return rest
            }
        }
    )
)

/**
 * Hook to ensure component only renders once store is hydrated
 * to prevent Next.js hydration mismatches.
 */
export function useHydrated() {
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
        // useStore.persist.hasHydrated() is available in newer zustand
        // checking the actual state of the storage rehydration
        const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false))
        const unsubFinishHydrate = useStore.persist.onFinishHydration(() => setHydrated(true))

        setHydrated(useStore.persist.hasHydrated())

        return () => {
            unsubHydrate()
            unsubFinishHydrate()
        }
    }, [])

    return hydrated
}

// Helper to keep store clean
const getHelpers = (set: any, get: any) => ({
    addRecentColor: (key: 'recentBackgrounds' | 'recentTexts' | 'recentAccents', color: string) => {
        if (!color || color.startsWith('linear-gradient')) return
        const current = get()[key]
        if (current[0] === color) return
        const filtered = current.filter((c: string) => c.toLowerCase() !== color.toLowerCase())
        set({ [key]: [color, ...filtered].slice(0, 12) })
    }
})
