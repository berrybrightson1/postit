'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Square, Smartphone, Box } from 'lucide-react'

export const CanvasSettings = () => {
    const { templateId, aspectRatio, setAspectRatio } = useStore()

    // Force 16:9 for YouTube Thumbnail to override any persisted state
    React.useEffect(() => {
        if (templateId === 'YouTubeThumbnail' && aspectRatio !== '16:9') {
            setAspectRatio('16:9')
        }
    }, [templateId, aspectRatio, setAspectRatio])

    return (
        <div className="pill-container !p-3 lg:hidden">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Box size={12} className="text-gray-400" />
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Canvas Proportions</label>
            </div>
            <div className="flex flex-wrap gap-2">
                {(['1:1', '4:5', '9:16', '16:9'] as const)
                    .filter(ratio => {
                        if (templateId === 'YouTubeThumbnail') return ratio === '16:9'
                        if (templateId === 'PublicNotice') return ratio !== '1:1'
                        // Default filter for other templates (exclude 16:9 unless specifically enabled if we want, but for now just add it to the list and let standard templates use it if they want, or maybe restrict 16:9 ONLY to YouTube?)
                        // Let's restrict 16:9 only to YouTubeThumbnail for now to keep UI clean as requested for "YouTube need only one"
                        if (ratio === '16:9') return false
                        return true
                    })
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
                            {ratio === '16:9' && <Smartphone size={12} strokeWidth={3} className="rotate-90" />} // Re-using rotated smartphone for landscape video
                            {ratio}
                        </button>
                    ))}
            </div>
        </div>
    )
}
