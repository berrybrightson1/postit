import React from 'react'
import { create } from 'zustand'

export type TemplateId =
    | 'News_1' | 'News_2' | 'News_3' | 'News_4' | 'News_5' | 'News_6'
    | 'Notice_1' | 'Notice_2' | 'Notice_3' | 'Notice_4' | 'Notice_5'
    | 'Quote_1' | 'Quote_2' | 'Quote_3' | 'Quote_4' | 'Quote_5'
    | 'SportsScore' | 'TwitterStyle' | 'MagazineCover'
    | 'InstagramPost' | 'FacebookPost' | 'YouTubeThumbnail'
    | 'BreakingNews' // Legacy/Alias for News_1
    | 'PublicNotice' // Legacy/Alias for Notice_1
    | 'ViralQuote'   // Legacy/Alias for Quote_1
export type AspectRatio = '1:1' | '9:16' | '4:5' | '16:9'
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
    fontWeight: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black'
    fontStyle: 'normal' | 'italic'
    textDecoration: 'none' | 'underline'
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
    isDragMode: boolean
    elementPositions: Record<string, { x: number, y: number }>
    logoPosition: { x: number, y: number }
    fontWeight: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black'
    fontStyle: 'normal' | 'italic'
    textDecoration: 'none' | 'underline'
    textAlign: TextAlign

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
    isScraping: boolean

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
    setIsDragMode: (enabled: boolean) => void
    setElementPosition: (id: string, pos: { x: number, y: number }) => void
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
    setVibe: (vibe: string) => void

    // Onboarding
    hasOnboarded: boolean
    setHasOnboarded: (val: boolean) => void

    // Overlay Actions
    addOverlay: (item: Omit<OverlayItem, 'id'>) => void
    updateOverlay: (id: string, changes: Partial<OverlayItem>) => void
    removeOverlay: (id: string) => void

    setLineHeight: (size: number) => void
    setLetterSpacing: (size: number) => void
    setFontWeight: (weight: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black') => void
    setFontFamily: (font: FontFamily) => void
    setTextAlign: (align: TextAlign) => void
    setFontStyle: (style: 'normal' | 'italic') => void
    setTextDecoration: (decoration: 'none' | 'underline') => void
    setTemplateAndReset: (id: TemplateId) => void
    reset: () => void
    generateFromLink: (url: string) => Promise<void>
}

export const defaultPalette = ['#3A2D9C', '#CE1126', '#006B3F', '#FCD116', '#000000', '#FFFFFF', '#E11D48']

// Default platform logos as SVG data URIs
const FACEBOOK_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4IiBmaWxsPSIjMTg3N0YyIi8+PHBhdGggZD0iTTI2LjUgMjVIMzBMMzEgMjBIMjYuNVYxNy41QzI2LjUgMTYgMjYuNSAxNC41IDI5IDE0LjVIMzFWMTAuMjVDMzAuMzUgMTAuMTc1IDI4LjcgMTAgMjcgMTBDMjMuMiAxMCAyMC41IDEyLjQzNzUgMjAuNSAxNi43NVYyMEgxNlYyNUgyMC41VjM4SDI2LjVWMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='
const INSTAGRAM_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImlnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNTE1QkQ0OyIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTUzN0ZGOyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0UxMzA2QzsiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0idXJsKCNpZykiLz48cGF0aCBkPSJNMjQgMTJDMTkuNiAxMiAxOS4xIDEyLjAyIDE3LjMgMTIuMUMxNS41IDEyLjE4IDEzLjkgMTIuNTUgMTIuNSAxMy4xQzExLjEgMTMuNjUgOS45IDE0LjQgOC43IDE1LjZDNy41IDE2LjggNi43NSAxOCA2LjIgMTkuNEM1LjY1IDIwLjggNS4yOCAyMi40IDUuMiAyNC4yQzUuMTIgMjYgNS4xIDI2LjUgNS4xIDMwLjlDNS4xIDM1LjMgNS4xMiAzNS44IDUuMiAzNy42QzUuMjggMzkuNCA1LjY1IDQxIDYuMiA0Mi40QzYuNzUgNDMuOCA3LjUgNDUgOC43IDQ2LjJDOS45IDQ3LjQgMTEuMSA0OC4xNSAxMi41IDQ4LjdDMTMuOSA0OS4yNSAxNS41IDQ5LjYyIDE3LjMgNDkuN0MxOS4xIDQ5Ljc4IDE5LjYgNDkuOCAyNCA0OS44QzI4LjQgNDkuOCAyOC45IDQ5Ljc4IDMwLjcgNDkuN0MzMi41IDQ5LjYyIDM0LjEgNDkuMjUgMzUuNSA0OC43QzM2LjkgNDguMTUgMzguMSA0Ny40IDM5LjMgNDYuMkM0MC41IDQ1IDQxLjI1IDQzLjggNDEuOCA0Mi40QzQyLjM1IDQxIDQyLjcyIDM5LjQgNDIuOCAzNy42QzQyLjg4IDM1LjggNDIuOSAzNS4zIDQyLjkgMzAuOUM0Mi45IDI2LjUgNDIuODggMjYgNDIuOCAyNC4yQzQyLjcyIDIyLjQgNDIuMzUgMjAuOCA0MS44IDE5LjRDNDEuMjUgMTggNDAuNSAxNi44IDM5LjMgMTUuNkMzOC4xIDE0LjQgMzYuOSAxMy42NSAzNS41IDEzLjFDMzQuMSAxMi41NSAzMi41IDEyLjE4IDMwLjcgMTIuMUMyOC45IDEyLjAyIDI4LjQgMTIgMjQgMTJaTTI0IDE1LjZDMjguMyAxNS42IDI4Ljc1IDE1LjYyIDMwLjUgMTUuN0MzMi4yIDE1Ljc4IDMzLjEgMTYuMTUgMzMuNyAxNi40QzM0LjUgMTYuNzUgMzUuMSAxNy4xNSAzNS43IDE3Ljc1QzM2LjMgMTguMzUgMzYuNyAxOC45NSAzNy4wNSAxOS43NUMzNy4zIDIwLjM1IDM3LjY3IDIxLjI1IDM3Ljc1IDIyLjk1QzM3LjgzIDI0Ljc1IDM3Ljg1IDI1LjIgMzcuODUgMjkuNUMzNy44NSAzMy44IDM3LjgzIDM0LjI1IDM3Ljc1IDM2LjA1QzM3LjY3IDM3Ljc1IDM3LjMgMzguNjUgMzcuMDUgMzkuMjVDMzYuNyA0MC4wNSAzNi4zIDQwLjY1IDM1LjcgNDEuMjVDMzUuMSA0MS44NSAzNC41IDQyLjI1IDMzLjcgNDIuNkMzMy4xIDQyLjg1IDMyLjIgNDMuMjIgMzAuNSA0My4zQzI4LjcgNDMuMzggMjguMjUgNDMuNCAyNCA0My40QzE5Ljc1IDQzLjQgMTkuMyA0My4zOCAxNy41IDQzLjNDMTUuOCA0My4yMiAxNC45IDQyLjg1IDE0LjMgNDIuNkMxMy41IDQyLjI1IDEyLjkgNDEuODUgMTIuMyA0MS4yNUMxMS43IDQwLjY1IDExLjMgNDAuMDUgMTAuOTUgMzkuMjVDMTAuNyAzOC42NSAxMC4zMyAzNy43NSAxMC4yNSAzNi4wNUMxMC4xNyAzNC4yNSAxMC4xNSAzMy44IDEwLjE1IDI5LjVDMTAuMTUgMjUuMiAxMC4xNyAyNC43NSAxMC4yNSAyMi45NUMxMC4zMyAyMS4yNSAxMC43IDIwLjM1IDEwLjk1IDE5Ljc1QzExLjMgMTguOTUgMTEuNyAxOC4zNSAxMi4zIDE3Ljc1QzEyLjkgMTcuMTUgMTMuNSAxNi43NSAxNC4zIDE2LjRDMTQuOSAxNi4xNSAxNS44IDE1Ljc4IDE3LjUgMTUuN0MxOS4yNSAxNS42MiAxOS43IDE1LjYgMjQgMTUuNloiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTI0IDMyLjVDMjAuNCAzMi41IDE3LjUgMjkuNiAxNy41IDI2QzE3LjUgMjIuNCAyMC40IDE5LjUgMjQgMTkuNUMyNy42IDE5LjUgMzAuNSAyMi40IDMwLjUgMjZDMzAuNSAyOS42IDI3LjYgMzIuNSAyNCAzMi41Wk0yNCAyMy4xQzIyLjQgMjMuMSAyMS4xIDI0LjQgMjEuMSAyNkMyMS4xIDI3LjYgMjIuNCAyOC45IDI0IDI4LjlDMjUuNiAyOC45IDI2LjkgMjcuNiAyNi45IDI2QzI2LjkgMjQuNCAyNS42IDIzLjEgMjQgMjMuMVoiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iMzEiIGN5PSIxOCIgcj0iMS41IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='
const TWITTER_X_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4IiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTI3LjUgMjRMMzUuNSAxNEgzMy41TDI2LjUgMjIuNUwyMSAxNEgxMi41TDIxIDI1TDEyLjUgMzVIMTQuNUwyMS41IDI2LjVMMjcgMzVIMzUuNUwyNy41IDI0WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4='

const defaultStyles: Record<TemplateId, TemplateStyle> = {
    News_1: { primaryColor: '#3A2D9C', textColor: '#FFFFFF', backgroundColor: '#0f172a', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    News_2: { primaryColor: '#E11D48', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.3, letterSpacing: -0.01, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Outfit', textAlign: 'left' },
    News_3: { primaryColor: '#10B981', textColor: '#FFFFFF', backgroundColor: '#064E3B', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.75, lineHeight: 1.5, letterSpacing: 0.02, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Space Grotesk', textAlign: 'left' },
    News_4: { primaryColor: '#F59E0B', textColor: '#111827', backgroundColor: '#FFFBEB', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.2, letterSpacing: -0.05, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Bebas Neue', textAlign: 'left' },
    News_5: { primaryColor: '#6366F1', textColor: '#FFFFFF', backgroundColor: '#1E1B4B', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    News_6: { primaryColor: '#E11D48', textColor: '#0F172A', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.2, letterSpacing: -0.02, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    Notice_1: { primaryColor: '#000000', textColor: '#111827', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.6, letterSpacing: 0, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    Notice_2: { primaryColor: '#2563EB', textColor: '#FFFFFF', backgroundColor: '#EFF6FF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Outfit', textAlign: 'left' },
    Notice_3: { primaryColor: '#D97706', textColor: '#111827', backgroundColor: '#FEF3C7', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.75, lineHeight: 1.7, letterSpacing: 0.05, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Space Grotesk', textAlign: 'left' },
    Notice_4: { primaryColor: '#4F46E5', textColor: '#FFFFFF', backgroundColor: '#EEF2FF', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.5, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Playfair Display', textAlign: 'left' },
    Notice_5: { primaryColor: '#7C3AED', textColor: '#FFFFFF', backgroundColor: '#F5F3FF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.3, letterSpacing: -0.02, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Outfit', textAlign: 'left' },
    Quote_1: { primaryColor: '#E11D48', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.3, letterSpacing: -0.02, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    Quote_2: { primaryColor: '#F472B6', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.2, letterSpacing: -0.04, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Playfair Display', textAlign: 'left' },
    Quote_3: { primaryColor: '#E5E7EB', textColor: '#000000', backgroundColor: '#E5E7EB', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 1, lineHeight: 1.1, letterSpacing: -0.02, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'center' },
    Quote_4: { primaryColor: '#10B981', textColor: '#FFFFFF', backgroundColor: '#064E3B', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.5, letterSpacing: 0.02, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Outfit', textAlign: 'left' },
    Quote_5: { primaryColor: '#F97316', textColor: '#FFFFFF', backgroundColor: '#262626', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.1, letterSpacing: -0.06, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Bebas Neue', textAlign: 'left' },
    SportsScore: { primaryColor: '#FCD116', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.1, letterSpacing: -0.05, fontWeight: 'black', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Bebas Neue', textAlign: 'left' },
    TwitterStyle: { primaryColor: '#1DA1F2', textColor: '#000000', backgroundColor: '#FFFFFF', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.5, letterSpacing: 0, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    InstagramPost: { primaryColor: '#E1306C', textColor: '#000000', backgroundColor: '#FFFFFF', aspectRatio: '4:5', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.4, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    FacebookPost: { primaryColor: '#1877F2', textColor: '#000000', backgroundColor: '#e11d48', aspectRatio: '1:1', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.5, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Inter', textAlign: 'left' },
    YouTubeThumbnail: { primaryColor: '#FF0000', textColor: '#FFFFFF', backgroundColor: '#F3F4F6', aspectRatio: '16:9', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.2, letterSpacing: 0, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Impact', textAlign: 'left' },
    MagazineCover: { primaryColor: '#FFFFFF', textColor: '#FFFFFF', backgroundColor: '#000000', aspectRatio: '9:16', backdropPosition: 'object-center', bodySize: 0.8, lineHeight: 1.2, letterSpacing: 0.1, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', fontFamily: 'Playfair Display', textAlign: 'left' },
    PublicNotice: {} as any, ViralQuote: {} as any, BreakingNews: {} as any
}

export const DEFAULT_CONTENT: Record<TemplateId, { headline: string, body: string, footer: string, email: string, brandingLine1: string, brandingLine2: string }> = {
    News_1: { headline: 'PRESIDENT BERRY 2028', body: 'The future is not only Bright, but absolutely Berry-tastic!', footer: 'President Berry Brightson', email: 'president@berry2028.gov', brandingLine1: 'BERRY 2028', brandingLine2: 'CAMPAIGN HQ' },
    News_2: { headline: 'BREAKING NEWS', body: 'Unprecedented developments in the tech sector today.', footer: 'Report by MMG', email: 'news@mmg.com', brandingLine1: 'LIVE UPDATE', brandingLine2: 'MMG NETWORK' },
    News_3: { headline: 'ENVIRONMENTAL UPDATE', body: 'New green initiatives launched across the federation.', footer: 'Eco Watch', email: 'green@nature.org', brandingLine1: 'EARTH FIRST', brandingLine2: 'ECO STUDIO' },
    News_4: { headline: 'MARKET ALERT', body: 'Digital assets reach new heights in morning trading.', footer: 'Financial Times', email: 'market@ledger.com', brandingLine1: 'BULL RUN', brandingLine2: 'CRYPTO DAILY' },
    News_5: { headline: 'SPORTS TODAY', body: 'Underdog victory stuns the league in final minutes.', footer: 'Sports Center', email: 'score@arena.com', brandingLine1: 'MATCH DAY', brandingLine2: 'PRO LEAGUE' },
    News_6: { headline: 'LOCAL SPOTLIGHT', body: 'Community garden celebrates record harvest this season.', footer: 'City Gazette', email: 'info@local.com', brandingLine1: 'CITY LIFE', brandingLine2: 'GAZETTE PRESS' },
    Notice_1: { headline: 'EXECUTIVE ORDER', body: 'All citizens are hereby granted access to premium design tools.', footer: 'Authorized by Berry', email: 'decree@berry.gov', brandingLine1: 'OFFICIAL', brandingLine2: 'GOVERNMENT' },
    Notice_2: { headline: 'PUBLIC ANNOUNCEMENT', body: 'System maintenance scheduled for tomorrow at midnight.', footer: 'IT Department', email: 'support@postit.app', brandingLine1: 'SYSTEM', brandingLine2: 'POSTIT.APP' },
    Notice_3: { headline: 'URGENT NOTICE', body: 'Please review the updated safety protocols for the laboratory.', footer: 'Safety Board', email: 'safety@lab.edu', brandingLine1: 'DANGER', brandingLine2: 'PROTOCOLS' },
    Notice_4: { headline: 'EVENT INVITATION', body: 'Join us for the annual gala celebrating innovation and art.', footer: 'The Committee', email: 'rsvp@gala.com', brandingLine1: 'CELEBRATE', brandingLine2: 'INNOVATION' },
    Notice_5: { headline: 'OFFICE POLICY', body: 'New remote work guidelines have been finalized for all staff.', footer: 'HR Management', email: 'work@corp.com', brandingLine1: 'HR OFFICE', brandingLine2: 'CORPORATE' },
    Quote_1: { headline: '', body: 'The only way to do great work is to love what you do.', footer: 'Steve Jobs', email: '', brandingLine1: 'WISDOM', brandingLine2: 'MMG STUDIO' },
    Quote_2: { headline: '', body: 'Innovation distinguishes between a leader and a follower.', footer: 'Steve Jobs', email: '', brandingLine1: 'LEADER', brandingLine2: 'VISION' },
    Quote_3: { headline: 'CHURCH NAME', body: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.', footer: 'PASTOR NAME', email: '', brandingLine1: 'SUNDAY', brandingLine2: 'SERVICE' },
    Quote_4: { headline: '', body: 'Your time is limited, so don\'t waste it living someone else\'s life.', footer: 'Steve Jobs', email: '', brandingLine1: 'TIME', brandingLine2: 'LIMITED' },
    Quote_5: { headline: '', body: 'Design is not just what it looks like and feels like. Design is how it works.', footer: 'Steve Jobs', email: '', brandingLine1: 'DESIGN', brandingLine2: 'WORKS' },
    SportsScore: { headline: 'FINAL SCORE', body: 'EAGLES 24 - 21 LIONS', footer: 'Season Opener', email: 'stats@league.com', brandingLine1: 'GAME OVER', brandingLine2: 'STADIUM LIVE' },
    TwitterStyle: { headline: 'Postit App', body: 'Building the world\'s most intuitive design tool for non-designers.', footer: '10:45 AM • Feb 5, 2026', email: '@postitapp', brandingLine1: 'SOCIAL', brandingLine2: 'MMG NETWORK' },
    InstagramPost: { headline: 'postit_app', body: 'Capturing moments, creating memories. 📸✨ #design #creative', footer: 'San Francisco, CA', email: 'Liked by ishowspeed, mr.beast and 8.7K others', brandingLine1: 'INSTA', brandingLine2: 'GRAM' },
    FacebookPost: { headline: 'Postit App', body: 'We are excited to announce our new features coming this summer! Stay tuned for more updates.', footer: 'Just now · Global', email: 'Bbl Drizzy and 2.4K others', brandingLine1: '387', brandingLine2: '1.2K' },
    YouTubeThumbnail: { headline: 'CREATOR ECONOMY', body: 'The untold truth about building a digital empire in 2026.', footer: 'Special Report', email: 'watch now', brandingLine1: 'DEEP DIVE', brandingLine2: 'ANALYSIS' },
    MagazineCover: { headline: 'CREATIVITY', body: 'How to master the art of visual storytelling in 2026.', footer: 'Special Edition', email: 'magazine@vog.com', brandingLine1: 'ISSUE 42', brandingLine2: 'STYLISH' },
    BreakingNews: {} as any, PublicNotice: {} as any, ViralQuote: {} as any
}

// Default profile images for social media templates
const defaultProfileImages: Partial<Record<TemplateId, string>> = {
    FacebookPost: FACEBOOK_LOGO,
    InstagramPost: INSTAGRAM_LOGO,
    TwitterStyle: TWITTER_X_LOGO,
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
    fontStyle: 'normal' as 'normal' | 'italic',
    textDecoration: 'none' as 'none' | 'underline',
    mainImage: '', // Default to empty for explicit placeholders
    logo: '',
    profileImage: '',
    brandingLine1: 'BERRY 2028',
    brandingLine2: 'CAMPAIGN HQ',
    showWatermark: true,
    isDragMode: false,
    elementPositions: {},
    logoPosition: { x: 8, y: 8 },
    templateStyles: { ...defaultStyles },
    recentBackgrounds: [...defaultPalette],
    recentTexts: [...defaultPalette],
    recentAccents: [...defaultPalette],
    overlays: [] as OverlayItem[],
    userTier: 'pro' as 'free' | 'pro',
    isAuthenticated: false,
    user: null as { name: string, avatar: string } | null,
    isProPanelOpen: false,
    autoFontSize: false,
    showReadabilityGradient: false,
    extractedColors: [],
    hasOnboarded: false,
    isScraping: false,
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
                    const defaultProfileImage = defaultProfileImages[templateId] || ''
                    set({
                        templateId,
                        ...style,
                        profileImage: defaultProfileImage
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
                setIsDragMode: (isDragMode) => set({ isDragMode }),
                setElementPosition: (id, pos) => set((state) => ({
                    elementPositions: {
                        ...state.elementPositions,
                        [id]: pos
                    }
                })),
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
                    const unique = colors
                        .map(c => c.toUpperCase())
                        .filter((value, index, self) => self.indexOf(value) === index)
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
                setVibe: (vibe) => get().applyVibe(vibe),
                setHasOnboarded: (val) => set({ hasOnboarded: val }),

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
                setFontWeight: (fontWeight: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extra-bold' | 'black') => {
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
                setFontStyle: (fontStyle: 'normal' | 'italic') => {
                    const { templateId, templateStyles } = get()
                    set({
                        fontStyle,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], fontStyle }
                        }
                    })
                },
                setTextDecoration: (textDecoration: 'none' | 'underline') => {
                    const { templateId, templateStyles } = get()
                    set({
                        textDecoration,
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...templateStyles[templateId], textDecoration }
                        }
                    })
                },
                setTemplateAndReset: (templateId) => {
                    const { templateStyles } = get()
                    // Get defaults for the NEW templateId
                    const defaultStyle = defaultStyles[templateId] || defaultStyles[templateId] // Fallback handled by type safety usually, but safe access
                    const defaultContent = DEFAULT_CONTENT[templateId] || DEFAULT_CONTENT.News_1

                    set({
                        templateId,
                        ...defaultStyle, // Apply styles immediately
                        ...defaultContent, // Apply content Defaults immediately (fixes "AMA GHANA" issue)
                        overlays: [],
                        mainImage: '',
                        profileImage: '',
                        logo: '',
                        // Reset the style object for this template in the registry too
                        templateStyles: {
                            ...templateStyles,
                            [templateId]: { ...defaultStyle }
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
                        mainImage: '', // Clear images on reset
                        profileImage: '',
                        logo: '',
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

                generateFromLink: async (url: string) => {
                    const { templateId, templateStyles } = get()

                    set({ isScraping: true })

                    try {
                        const response = await fetch('/api/scrape-link', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url })
                        })

                        if (!response.ok) {
                            const errorData = await response.json()
                            throw new Error(errorData.error || 'Failed to fetch link data')
                        }

                        const data = await response.json()

                        set({
                            headline: data.author || data.title?.split(' on ')[0] || get().headline,
                            body: data.description || get().body,
                            footer: data.date || data.title || get().footer,
                            email: data.authorHandle || get().email,
                            mainImage: data.image || get().mainImage,
                            // If it's a social template, try to use the image as profile image too if appropriate
                            profileImage: (templateId === 'TwitterStyle' || templateId === 'FacebookPost' || templateId === 'InstagramPost')
                                ? (data.image || get().profileImage)
                                : get().profileImage
                        })

                    } catch (error) {
                        console.error('Generation failed:', error)
                        // Note: We could add a toast here if we had toast in the store, 
                        // but usually it's better to handle UI feedback in the component.
                    } finally {
                        set({ isScraping: false })
                    }
                },
            }),
            {
                name: 'postit-storage',
                partialize: (state) => {
                    // Exclude large data fields to prevent QuotaExceededError
                    const {
                        mainImage,
                        profileImage,
                        // also exclude user object if it contains a base64 avatar
                        user,
                        ...rest
                    } = state
                    return rest
                },
                onRehydrateStorage: () => {
                    return (state, error) => {
                        if (error) {
                            console.error('Postit Storage: hydration failed', error)
                            // Optional: Clear storage on error
                            // localStorage.removeItem('postit-storage')
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
                    hasOnboarded, // Exclude from persistence
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
