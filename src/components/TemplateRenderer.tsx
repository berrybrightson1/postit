'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { BreakingNews } from './templates/BreakingNews'
import { PublicNotice } from './templates/PublicNotice'
import { ViralQuote } from './templates/ViralQuote'
import { SportsScore } from './templates/SportsScore'
import { TwitterStyle } from './templates/TwitterStyle'
import { MagazineCover } from './templates/MagazineCover'

export const TemplateRenderer = () => {
    const { templateId, fontFamily } = useStore()

    // Dynamically load the selected Google Font
    React.useEffect(() => {
        if (!fontFamily) return

        const fontId = `font-canvas-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`
        if (document.getElementById(fontId)) return

        const link = document.createElement('link')
        link.id = fontId
        link.rel = 'stylesheet'
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@400;700;900&display=swap`
        document.head.appendChild(link)
    }, [fontFamily])

    switch (templateId) {
        case 'News_1':
        case 'News_2':
        case 'News_3':
        case 'News_4':
        case 'News_5':
        case 'BreakingNews':
            return <BreakingNews />
        case 'Notice_1':
        case 'Notice_2':
        case 'Notice_3':
        case 'Notice_4':
        case 'Notice_5':
        case 'PublicNotice':
            return <PublicNotice />
        case 'Quote_1':
        case 'Quote_2':
        case 'Quote_3':
        case 'Quote_4':
        case 'Quote_5':
        case 'ViralQuote':
            return <ViralQuote />
        case 'SportsScore':
            return <SportsScore />
        case 'TwitterStyle':
            return <TwitterStyle />
        case 'MagazineCover':
            return <MagazineCover />
        default:
            return <BreakingNews />
    }
}
