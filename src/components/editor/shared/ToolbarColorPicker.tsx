'use client'

import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import { X, ImagePlus } from 'lucide-react'

export const ToolbarColorPicker = ({
    label,
    value,
    onChange,
    icon: Icon,
    recentColors = [],
    smartColors = [],
    userTier,
    showImageUpload,
    onImageUpload,
    onImageRemove,
    hasImage
}: {
    label: string,
    value: string,
    onChange: (val: string) => void,
    icon: any,
    recentColors?: string[],
    smartColors?: string[],
    userTier: 'free' | 'pro',
    showImageUpload?: boolean,
    onImageUpload?: () => void,
    onImageRemove?: () => void,
    hasImage?: boolean
}) => {
    const pickerRef = useRef<HTMLInputElement>(null)

    return (
        <div className="flex items-center gap-2 px-3 h-9 bg-gray-100/80 rounded-2xl border border-transparent hover:border-black/5 transition-all">
            <div className="flex items-center gap-1.5 mr-1">
                <Icon size={10} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">{label}</span>
            </div>

            <div className="flex items-center gap-1">
                <div
                    onClick={() => userTier === 'pro' && pickerRef.current?.click()}
                    className={cn(
                        "w-6 h-6 rounded-lg border border-black/10 cursor-pointer shadow-inner relative transition-transform active:scale-90",
                        userTier === 'free' && "grayscale opacity-50 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: value }}
                >
                    <input
                        ref={pickerRef}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={userTier === 'free'}
                        title={`Pick ${label} color`}
                        placeholder={`Pick ${label} color`}
                    />
                </div>

                <div className="flex gap-1 ml-1">
                    {(smartColors.length > 0 ? smartColors : recentColors).slice(0, 4).map((c, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(c)}
                            className={cn(
                                "w-5 h-5 lg:w-4 lg:h-4 rounded-full ring-1 ring-inset ring-black/5 transition-transform hover:scale-110",
                                value.toLowerCase() === c.toLowerCase() && "ring-primary ring-2"
                            )}
                            style={{ backgroundColor: c }}
                            title={`Select ${label} color preset`}
                        />
                    ))}
                </div>

                {showImageUpload && (
                    <div className="flex items-center gap-1 ml-1 border-l border-black/5 pl-2">
                        {hasImage ? (
                            <button
                                onClick={onImageRemove}
                                className="p-1 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                title="Remove Background Image"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                        ) : (
                            <button
                                onClick={onImageUpload}
                                className="p-1 text-gray-400 hover:text-primary hover:bg-white rounded-md transition-all shadow-sm active:scale-90"
                                title="Upload Background Image"
                            >
                                <ImagePlus size={12} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
