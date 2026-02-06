import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Hash } from 'lucide-react'
import { FontPicker } from './FontPicker'
import { BrandedSelect } from './BrandedSelect'
import { fontWeightMap } from '@/lib/utils'

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

export const TypographySettings = () => {
    const {
        templateId,
        templateStyles,
        setBodySize,
        setLineHeight,
        setLetterSpacing,
        fontFamily,
        setFontFamily,
        fontWeight,
        setFontWeight,
        fontStyle,
        setFontStyle,
        textDecoration,
        setTextDecoration,
        textAlign,
        setTextAlign,
        userTier
    } = useStore()

    const bodySize = templateStyles[templateId]?.bodySize || 1
    const currentPt = Math.round(bodySize * 24)

    const handleSizeChange = (pt: number) => {
        setBodySize(pt / 24)
    }

    const WEIGHT_OPTIONS = Object.keys(fontWeightMap).map(w => ({
        label: w,
        value: w
    }))

    const SIZE_OPTIONS = FONT_SIZES.map(s => ({
        label: `${s}`,
        value: s
    }))

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm min-w-[340px]">
            {/* Ribbon Header */}
            <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <Type size={12} className="text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Typography Ribbon</span>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
                {/* Font Family Row */}
                <div className="flex items-center gap-2">
                    <div className="flex-[2]">
                        <FontPicker
                            value={fontFamily}
                            onChange={setFontFamily}
                            userTier={userTier}
                        />
                    </div>
                </div>

                {/* Weight & Size Row - Photoshop Style */}
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <BrandedSelect
                            value={fontWeight}
                            onChange={setFontWeight}
                            options={WEIGHT_OPTIONS}
                            placeholder="Weight"
                            className="w-full"
                        />
                    </div>
                    <div className="w-24">
                        <BrandedSelect
                            value={currentPt}
                            onChange={handleSizeChange}
                            options={SIZE_OPTIONS}
                            placeholder="Size"
                        />
                    </div>
                </div>


                {/* Granular Sliders Area */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] font-black uppercase tracking-tight text-gray-400">Line Height</span>
                            <span className="text-[9px] font-bold text-primary">{templateStyles[templateId]?.lineHeight || 1.4}</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2.5"
                            step="0.1"
                            value={templateStyles[templateId]?.lineHeight || 1.4}
                            onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            title="Line Height Slider"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] font-black uppercase tracking-tight text-gray-400">Kerning</span>
                            <span className="text-[9px] font-bold text-primary">{templateStyles[templateId]?.letterSpacing || 0}</span>
                        </div>
                        <input
                            type="range"
                            min="-0.1"
                            max="0.5"
                            step="0.01"
                            value={templateStyles[templateId]?.letterSpacing || 0}
                            onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            title="Kerning Slider"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
