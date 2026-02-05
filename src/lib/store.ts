import React from 'react'
import { create } from 'zustand'

export type TemplateId =
    | 'News_1' | 'News_2' | 'News_3' | 'News_4' | 'News_5' | 'News_6'
    | 'Notice_1' | 'Notice_2' | 'Notice_3' | 'Notice_4' | 'Notice_5'
    | 'Quote_1' | 'Quote_2' | 'Quote_3' | 'Quote_4' | 'Quote_5'
    | 'SportsScore' | 'TwitterStyle' | 'MagazineCover'
    | 'BreakingNews' // Legacy/Alias for News_1
    | 'PublicNotice' // Legacy/Alias for Notice_1
    | 'ViralQuote'   // Legacy/Alias for Quote_1
export type AspectRatio = '1:1' | '9:16' | '4:5'
export type FontFamily = string
export type TextAlign = 'left' | 'center' | 'right'

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
    textAlign: TextAlign
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
    profileImage: string | null
    brandingLine1: string
    brandingLine2: string
    showWatermark: boolean
    isLogoDraggable: boolean
    logoPosition: { x: number, y: number }

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
    textAlign: TextAlign

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
    setProfileImage: (image: string | null) => void
    setBrandingLine1: (text: string) => void
    setBrandingLine2: (text: string) => void
    setShowWatermark: (show: boolean) => void
    setIsLogoDraggable: (draggable: boolean) => void
    setLogoPosition: (pos: { x: number, y: number }) => void
    setBodySize: (size: number) => void
    setUserTier: (tier: 'free' | 'pro') => void
    setAuthenticated: (auth: boolean) => void
    setUser: (user: { name: string, avatar: string } | null) => void
    setIsProPanelOpen: (open: boolean) => void
    setAutoFontSize: (auto: boolean) => void

    // Smart Features
    showReadabilityGradient: boolean
    setShowReadabilityGradient: (show: boolean) => void
    extractedColors: string[]
    setExtractedColors: (colors: string[]) => void
    applyVibe: (vibe: string) => void

    // Overlay Actions
    addOverlay: (item: Omit<OverlayItem, 'id'>) => void
    updateOverlay: (id: string, changes: Partial<OverlayItem>) => void
    removeOverlay: (id: string) => void

    setLineHeight: (size: number) => void
    setLetterSpacing: (size: number) => void
    setFontWeight: (weight: 'normal' | 'bold' | 'black') => void
    setFontFamily: (font: FontFamily) => void
    setTextAlign: (align: TextAlign) => void
    resetCurrentTemplate: () => void
    reset: () => void
}

export const defaultPalette = ['#3A2D9C', '#CE1126', '#006B3F', '#FCD116', '#000000', '#FFFFFF', '#E11D48']

const defaultStyles: Record<TemplateId, TemplateStyle> = {
    News_1: { primaryColor: '#3A2D9C', textColor: '#FFFFFF', backgroundColor: '#0f172a', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Inter', textAlign: 'center' },
    News_2: { primaryColor: '#E11D48', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.1, lineHeight: 1.3, letterSpacing: -0.01, fontWeight: 'black', fontFamily: 'Outfit', textAlign: 'center' },
    News_3: { primaryColor: '#10B981', textColor: '#FFFFFF', backgroundColor: '#064E3B', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.9, lineHeight: 1.5, letterSpacing: 0.02, fontWeight: 'normal', fontFamily: 'Space Grotesk', textAlign: 'left' },
    News_4: { primaryColor: '#F59E0B', textColor: '#111827', backgroundColor: '#FFFBEB', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 1.2, lineHeight: 1.2, letterSpacing: -0.05, fontWeight: 'black', fontFamily: 'Bebas Neue', textAlign: 'center' },
    News_5: { primaryColor: '#6366F1', textColor: '#FFFFFF', backgroundColor: '#1E1B4B', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Inter', textAlign: 'center' },
    News_6: { primaryColor: '#E11D48', textColor: '#0F172A', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.2, letterSpacing: -0.02, fontWeight: 'black', fontFamily: 'Inter', textAlign: 'left' },
    Notice_1: { primaryColor: '#000000', textColor: '#111827', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.6, letterSpacing: 0, fontWeight: 'normal', fontFamily: 'Inter', textAlign: 'left' },
    Notice_2: { primaryColor: '#2563EB', textColor: '#FFFFFF', backgroundColor: '#EFF6FF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.1, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Outfit', textAlign: 'left' },
    Notice_3: { primaryColor: '#D97706', textColor: '#111827', backgroundColor: '#FEF3C7', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.9, lineHeight: 1.7, letterSpacing: 0.05, fontWeight: 'normal', fontFamily: 'Space Grotesk', textAlign: 'center' },
    Notice_4: { primaryColor: '#4F46E5', textColor: '#FFFFFF', backgroundColor: '#EEF2FF', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.5, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Playfair Display', textAlign: 'center' },
    Notice_5: { primaryColor: '#7C3AED', textColor: '#FFFFFF', backgroundColor: '#F5F3FF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.2, lineHeight: 1.3, letterSpacing: -0.02, fontWeight: 'black', fontFamily: 'Outfit', textAlign: 'left' },
    Quote_1: { primaryColor: '#E11D48', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.2, lineHeight: 1.3, letterSpacing: -0.02, fontWeight: 'black', fontFamily: 'Inter', textAlign: 'center' },
    Quote_2: { primaryColor: '#F472B6', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 1.3, lineHeight: 1.2, letterSpacing: -0.04, fontWeight: 'black', fontFamily: 'Playfair Display', textAlign: 'left' },
    Quote_3: { primaryColor: '#8B5CF6', textColor: '#FFFFFF', backgroundColor: '#1E1B4B', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 1.1, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontFamily: 'Space Grotesk', textAlign: 'center' },
    Quote_4: { primaryColor: '#10B981', textColor: '#FFFFFF', backgroundColor: '#064E3B', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.5, letterSpacing: 0.02, fontWeight: 'normal', fontFamily: 'Outfit', textAlign: 'center' },
    Quote_5: { primaryColor: '#F97316', textColor: '#FFFFFF', backgroundColor: '#262626', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 1.4, lineHeight: 1.1, letterSpacing: -0.06, fontWeight: 'black', fontFamily: 'Bebas Neue', textAlign: 'center' },
    SportsScore: { primaryColor: '#FCD116', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 1.5, lineHeight: 1.1, letterSpacing: -0.05, fontWeight: 'black', fontFamily: 'Bebas Neue', textAlign: 'left' },
    TwitterStyle: { primaryColor: '#1DA1F2', textColor: '#000000', backgroundColor: '#FFFFFF', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.5, letterSpacing: 0, fontWeight: 'normal', fontFamily: 'Inter', textAlign: 'left' },
    MagazineCover: { primaryColor: '#FFFFFF', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 1.0, lineHeight: 1.2, letterSpacing: 0.1, fontWeight: 'bold', fontFamily: 'Playfair Display', textAlign: 'center' },
    PublicNotice: {} as any, ViralQuote: {} as any, BreakingNews: {} as any
}

const DEFAULT_CONTENT: Record<TemplateId, { headline: string, body: string, footer: string, email: string, brandingLine1: string, brandingLine2: string }> = {
    News_1: { headline: 'PRESIDENT BERRY 2028', body: 'The future is not only Bright, but absolutely Berry-tastic!', footer: 'President Berry Brightson', email: 'president@berry2028.gov', brandingLine1: 'BERRY 2028', brandingLine2: 'CAMPAIGN HQ' },
    News_2: { headline: 'BREAKING NEWS', body: 'Unprecedented developments in the tech sector today.', footer: 'Report by MMG', email: 'news@mmg.com', brandingLine1: 'LIVE UPDATE', brandingLine2: 'MMG NETWORK' },
    News_3: { headline: 'ENVIRONMENTAL UPDATE', body: 'New green initiatives launched across the federation.', footer: 'Eco Watch', email: 'green@nature.org', brandingLine1: 'EARTH FIRST', brandingLine2: 'ECO STUDIO' },
    News_4: { headline: 'MARKET ALERT', body: 'Digital assets reach new heights in morning trading.', footer: 'Financial Times', email: 'market@ledger.com', brandingLine1: 'BULL RUN', brandingLine2: 'CRYPTO DAILY' },
    News_5: { headline: 'SPORTS TODAY', body: 'Underdog victory stuns the league in final minutes.', footer: 'Sports Center', email: 'score@arena.com', brandingLine1: 'MATCH DAY', brandingLine2: 'PRO LEAGUE' },
    News_6: { headline: 'BREAKING NEWS', body: 'Why did Berry Brightson become the President in 2028? Because he promised that the future would not only be Bright, but it would be absolutely Berry-tastic for everyone!', footer: 'PRESIDENT BERRY BRIGHTSON', email: 'president@berry2028.gov', brandingLine1: 'BERRY 2028', brandingLine2: 'CAMPAIGN HQ' },
    Notice_1: { headline: 'EXECUTIVE ORDER', body: 'All citizens are hereby granted access to premium design tools.', footer: 'Authorized by Berry', email: 'decree@berry.gov', brandingLine1: 'OFFICIAL', brandingLine2: 'GOVERNMENT' },
    Notice_2: { headline: 'PUBLIC ANNOUNCEMENT', body: 'System maintenance scheduled for tomorrow at midnight.', footer: 'IT Department', email: 'support@postit.app', brandingLine1: 'SYSTEM', brandingLine2: 'POSTIT.APP' },
    Notice_3: { headline: 'URGENT NOTICE', body: 'Please review the updated safety protocols for the laboratory.', footer: 'Safety Board', email: 'safety@lab.edu', brandingLine1: 'DANGER', brandingLine2: 'PROTOCOLS' },
    Notice_4: { headline: 'EVENT INVITATION', body: 'Join us for the annual gala celebrating innovation and art.', footer: 'The Committee', email: 'rsvp@gala.com', brandingLine1: 'CELEBRATE', brandingLine2: 'INNOVATION' },
    Notice_5: { headline: 'OFFICE POLICY', body: 'New remote work guidelines have been finalized for all staff.', footer: 'HR Management', email: 'work@corp.com', brandingLine1: 'HR OFFICE', brandingLine2: 'CORPORATE' },
    Quote_1: { headline: '', body: 'The only way to do great work is to love what you do.', footer: 'Steve Jobs', email: '', brandingLine1: 'WISDOM', brandingLine2: 'MMG STUDIO' },
    Quote_2: { headline: '', body: 'Innovation distinguishes between a leader and a follower.', footer: 'Steve Jobs', email: '', brandingLine1: 'LEADER', brandingLine2: 'VISION' },
    Quote_3: { headline: '', body: 'Stay hungry, stay foolish.', footer: 'Steve Jobs', email: '', brandingLine1: 'HUNGRY', brandingLine2: 'FOOLISH' },
    Quote_4: { headline: '', body: 'Your time is limited, so don\'t waste it living someone else\'s life.', footer: 'Steve Jobs', email: '', brandingLine1: 'TIME', brandingLine2: 'LIMITED' },
    Quote_5: { headline: '', body: 'Design is not just what it looks like and feels like. Design is how it works.', footer: 'Steve Jobs', email: '', brandingLine1: 'DESIGN', brandingLine2: 'WORKS' },
    SportsScore: { headline: 'FINAL SCORE', body: 'EAGLES 24 - 21 LIONS', footer: 'Season Opener', email: 'stats@league.com', brandingLine1: 'GAME OVER', brandingLine2: 'STADIUM LIVE' },
    TwitterStyle: { headline: 'Postit App', body: 'Building the world\'s most intuitive design tool for non-designers.', footer: '10:45 AM • Feb 5, 2026', email: '@postitapp', brandingLine1: 'SOCIAL', brandingLine2: 'MMG NETWORK' },
    MagazineCover: { headline: 'CREATIVITY', body: 'How to master the art of visual storytelling in 2026.', footer: 'Special Edition', email: 'magazine@vog.com', brandingLine1: 'ISSUE 42', brandingLine2: 'STYLISH' },
    BreakingNews: {} as any, PublicNotice: {} as any, ViralQuote: {} as any
}

// Consolidated source of truth for legacy aliases
defaultStyles.BreakingNews = { ...defaultStyles.News_1 }
defaultStyles.PublicNotice = { ...defaultStyles.Notice_1 }
defaultStyles.ViralQuote = { ...defaultStyles.Quote_1 }

DEFAULT_CONTENT.BreakingNews = { ...DEFAULT_CONTENT.News_1 }
DEFAULT_CONTENT.PublicNotice = { ...DEFAULT_CONTENT.Notice_1 }
DEFAULT_CONTENT.ViralQuote = { ...DEFAULT_CONTENT.Quote_1 }

const initialState = {
    templateId: 'News_6' as TemplateId,
    headline: 'BREAKING NEWS',
    body: 'Why did Berry Brightson become the President in 2028? Because he promised that the future would not only be Bright, but it would be absolutely Berry-tastic for everyone!',
    footer: 'PRESIDENT BERRY BRIGHTSON',
    email: 'president@berry2028.gov',
    ...defaultStyles.News_6,
    mainImage: null,
    logo: '/images/landing/logo-stroke.png',
    profileImage: '/images/landing/round.jpeg',
    brandingLine1: 'BERRY 2028',
    brandingLine2: 'CAMPAIGN HQ',
    showWatermark: true,
    isLogoDraggable: true,
    logoPosition: { x: 8, y: 8 },
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
    showReadabilityGradient: false,
    extractedColors: [],
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
                setProfileImage: (profileImage) => set({ profileImage }),
                setBrandingLine1: (brandingLine1) => set({ brandingLine1 }),
                setBrandingLine2: (brandingLine2) => set({ brandingLine2 }),
                setShowWatermark: (showWatermark) => set({ showWatermark }),
                setIsLogoDraggable: (isLogoDraggable) => set({ isLogoDraggable }),
                setLogoPosition: (logoPosition) => set({ logoPosition }),
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

                // Smart Features Actions
                setShowReadabilityGradient: (show) => set({ showReadabilityGradient: show }),
                setExtractedColors: (colors) => {
                    // Ensure unique colors
                    const unique = Array.from(new Set(colors.map(c => c.toUpperCase())))
                    set({ extractedColors: unique })
                },
                applyVibe: (vibe) => set((state) => {
                    const styles = { ...state.templateStyles }
                    const currentStyle = { ...styles[state.templateId] }

                    let vibeStyle = {}
                    switch (vibe) {
                        case 'Good News':
                            vibeStyle = {
                                primaryColor: '#16A34A', // Green-600
                                backgroundColor: '#F0FDF4', // Green-50
                                textColor: '#14532D', // Green-900
                                fontFamily: 'Inter',
                                fontWeight: 'bold'
                            }
                            break;
                        case 'Bad News':
                            vibeStyle = {
                                primaryColor: '#DC2626', // Red-600
                                backgroundColor: '#000000',
                                textColor: '#FFFFFF',
                                fontFamily: 'Oswald',
                                fontWeight: 'black'
                            }
                            break;
                        case 'Sad':
                            vibeStyle = {
                                primaryColor: '#475569', // Slate-600
                                backgroundColor: '#F8FAFC', // Slate-50
                                textColor: '#334155', // Slate-700
                                fontFamily: 'Merriweather',
                                fontWeight: 'normal'
                            }
                            break;
                        case 'Official':
                            vibeStyle = {
                                primaryColor: '#1E3A8A', // Blue-900
                                backgroundColor: '#FFFFFF',
                                textColor: '#1E293B', // Slate-800
                                fontFamily: 'Playfair Display',
                                fontWeight: 'bold'
                            }
                            break;
                        case 'Meme':
                            vibeStyle = {
                                primaryColor: '#DB2777', // Pink-600
                                backgroundColor: '#FEF08A', // Yellow-200
                                textColor: '#000000',
                                fontFamily: 'Comic Sans MS',
                                fontWeight: 'bold'
                            }
                            break;
                    }

                    return {
                        ...vibeStyle,
                        templateStyles: {
                            ...styles,
                            [state.templateId]: { ...currentStyle, ...vibeStyle }
                        }
                    }
                }),

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
                setTextAlign: (textAlign) => {
                    const { templateId, templateStyles } = get()
                    set({
                        textAlign,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: {
                                ...templateStyles[templateId],
                                textAlign
                            }
                        }
                    })
                },
                resetCurrentTemplate: () => {
                    const { templateId, templateStyles } = get()
                    const defaultStyle = defaultStyles[templateId]
                    const defaultContent = DEFAULT_CONTENT[templateId] || DEFAULT_CONTENT.News_2

                    set({
                        ...defaultStyle,
                        ...defaultContent,
                        overlays: [],
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...defaultStyle }
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
                    return (state, error) => {
                        if (error) {
                            console.error('Postit Storage: hydration failed', error)
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

export function useHydrated() {
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
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

const getHelpers = (set: any, get: any) => ({
    addRecentColor: (key: 'recentBackgrounds' | 'recentTexts' | 'recentAccents', color: string) => {
        if (!color || color.startsWith('linear-gradient')) return
        const current = get()[key]
        if (current[0] === color) return
        const filtered = current.filter((c: string) => c.toLowerCase() !== color.toLowerCase())
        set({ [key]: [color, ...filtered].slice(0, 12) })
    }
})
