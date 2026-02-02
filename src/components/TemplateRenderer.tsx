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
    const { templateId } = useStore()

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
