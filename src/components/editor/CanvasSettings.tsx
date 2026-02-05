'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Square, Smartphone, Box } from 'lucide-react'

export const CanvasSettings = () => {
    const { templateId, aspectRatio, setAspectRatio } = useStore()

    return (
        <div className="pill-container !p-3 lg:hidden">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Box size={12} className="text-gray-400" />
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Canvas Proportions</label>
            </div>
            <div className="flex flex-wrap gap-2">
                {(['1:1', '4:5', '9:16'] as const)
                    .filter(ratio => templateId === 'PublicNotice' ? ratio !== '1:1' : true)
                    .map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black text-[9px] tracking-tight",
                                aspectRatio === ratio ? "bg-primary text-white shadow-md ring-1 ring-primary" : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
                            )}
                            title={`Set aspect ratio to ${ratio}`}
                        >
                            {ratio === '1:1' && <Square size={12} strokeWidth={3} />}
                            {ratio === '4:5' && <Smartphone size={12} strokeWidth={3} className="rotate-90" />}
                            {ratio === '9:16' && <Smartphone size={12} strokeWidth={3} />}
                            {ratio}
                        </button>
                    ))}
            </div>
        </div>
    )
}
