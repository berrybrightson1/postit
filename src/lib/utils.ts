import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const fontWeightMap = {
    'normal': 400,
    'bold': 700,
    'black': 900
} as const

export type Category = 'News' | 'Notice' | 'Quote' | 'Special'
export type TemplateId = 'BreakingNews' | 'PublicNotice' | 'ViralQuote' | 'News_1' | 'News_2' | 'Notice_1' | 'Notice_2' | 'Quote_1' | 'Quote_2' | 'Special_1' | 'Special_2'

export function getTemplateCategory(id: string): Category {
    if (id.startsWith('News_') || id === 'BreakingNews') return 'News'
    if (id.startsWith('Notice_') || id === 'PublicNotice') return 'Notice'
    if (id.startsWith('Quote_') || id === 'ViralQuote') return 'Quote'
    return 'Special'
}

export function isMediaTemplate(id: string): boolean {
    const category = getTemplateCategory(id)
    return category === 'News' || category === 'Special' || category === 'Notice'
}

/**
 * Compresses a base64 image string to a target size in KB.
 * Uses canvas for resizing and quality adjustment.
 */
export async function compressImage(base64Str: string, targetSizeKB: number = 400): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = base64Str
        img.onload = () => {
            const canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            // Max dimension to keep canvas performance reasonable
            const MAX_DIM = 1200
            if (width > MAX_DIM || height > MAX_DIM) {
                if (width > height) {
                    height = (height / width) * MAX_DIM
                    width = MAX_DIM
                } else {
                    width = (width / height) * MAX_DIM
                    height = MAX_DIM
                }
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, width, height)

            // Start with 0.8 quality and reduce if still too large
            let quality = 0.8
            let result = canvas.toDataURL('image/jpeg', quality)

            // Iteratively reduce quality if needed (crude but effective)
            while (result.length > targetSizeKB * 1024 && quality > 0.1) {
                quality -= 0.1
                result = canvas.toDataURL('image/jpeg', quality)
            }

            resolve(result)
        }
    })
}
