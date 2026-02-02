'use client'

import React, { useState } from 'react'
import { toPng, toBlob } from 'html-to-image'
import { Download, Copy, Check, Loader2, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { useStore, AspectRatio } from '@/lib/store'
import { LockOverlay } from '@/components/common/LockOverlay'
import { cn } from '@/lib/utils'

export const ExportControls = () => {
    const [isExporting, setIsExporting] = useState(false)
    const [isBulkExporting, setIsBulkExporting] = useState(false)
    const [justCopied, setJustCopied] = useState(false)
    const [selectedRatios, setSelectedRatios] = useState<AspectRatio[]>(['1:1', '4:5', '9:16'])

    const { userTier, setAspectRatio, aspectRatio } = useStore()

    const handleDownload = async (highRes = false) => {
        const node = document.getElementById('postit-export-canvas')
        if (!node) return

        setIsExporting(true)
        try {
            let pixelRatio = 1
            if (highRes) {
                pixelRatio = 4
            } else if (userTier === 'pro') {
                pixelRatio = 2
            }

            const dataUrl = await toPng(node, { pixelRatio })
            const link = document.createElement('a')
            link.download = `postit-${highRes ? 'hd-' : ''}${Date.now()}.png`
            link.href = dataUrl
            link.click()
            toast.success(`${highRes ? 'HD ' : ''}Image downloaded successfully!`)
        } catch (error) {
            console.error('Export failed', error)
            toast.error('Failed to download image.')
        } finally {
            setIsExporting(false)
        }
    }

    const handleBulkExport = async () => {
        if (selectedRatios.length === 0) {
            toast.error('Please select at least one aspect ratio.')
            return
        }

        const node = document.getElementById('postit-export-canvas')
        if (!node) return

        const originalRatio = aspectRatio
        setIsBulkExporting(true)

        try {
            toast.info(`Starting bulk export of ${selectedRatios.length} images...`)

            for (let i = 0; i < selectedRatios.length; i++) {
                const ratio = selectedRatios[i]

                // 1. Change aspect ratio
                setAspectRatio(ratio)

                // 2. Wait for layout movement and CSS transitions (500ms in CSS + buffer)
                await new Promise(resolve => setTimeout(resolve, 800))

                // 3. Capture
                const pixelRatio = 4 // Always HD for bulk
                const dataUrl = await toPng(node, {
                    pixelRatio,
                    cacheBust: true // Help with some browser caching issues
                })

                // 4. Download
                const link = document.createElement('a')
                link.download = `postit-${ratio.replace(':', 'x')}-${Date.now()}.png`
                link.href = dataUrl
                link.click()

                // Small additional delay to prevent browser download batching issues
                await new Promise(resolve => setTimeout(resolve, 200))
            }

            toast.success('Bulk export complete!')
        } catch (error) {
            console.error('Bulk export failed', error)
            toast.error('Bulk export failed. Some images may have been missed.')
        } finally {
            // Restore original ratio
            setAspectRatio(originalRatio)
            setIsBulkExporting(false)
        }
    }

    const toggleRatio = (ratio: AspectRatio) => {
        if (selectedRatios.includes(ratio)) {
            setSelectedRatios(selectedRatios.filter(r => r !== ratio))
        } else {
            setSelectedRatios([...selectedRatios, ratio])
        }
    }

    const handleCopy = async () => {
        const node = document.getElementById('postit-export-canvas')
        if (!node) return

        setIsExporting(true)
        try {
            const pixelRatio = userTier === 'pro' ? 2 : 1
            const blob = await toBlob(node, { pixelRatio })
            if (!blob) throw new Error('Failed to create blob')

            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ])

            setJustCopied(true)
            toast.success('Copied to clipboard!')
            setTimeout(() => setJustCopied(false), 2000)
        } catch (error) {
            console.error('Copy failed', error)
            toast.error('Failed to copy to clipboard.')
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="pill-container !p-3">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Share2 size={12} className="text-gray-400" />
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Export & Share</label>
            </div>

            <div className="flex flex-col gap-4">
                {/* Standard Export */}
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => handleDownload(false)}
                            disabled={isExporting || isBulkExporting}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all font-black text-[10px] uppercase tracking-wider disabled:opacity-50"
                        >
                            {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                            Basic
                        </button>

                        <button
                            onClick={handleCopy}
                            disabled={isExporting || isBulkExporting}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all font-black text-[10px] uppercase tracking-wider disabled:opacity-50"
                        >
                            {isExporting ? <Loader2 size={12} className="animate-spin" /> : justCopied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                            {justCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for HD Export">
                        <button
                            onClick={() => handleDownload(true)}
                            disabled={isExporting || isBulkExporting || userTier === 'free'}
                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all font-black text-[10px] uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-gray-900/10"
                        >
                            {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                            HD Download
                        </button>
                    </LockOverlay>
                </div>

                {/* Bulk Multi-Export - Pro Feature */}
                <div className="pt-4 border-t border-gray-100 mt-1">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Multi-Size Export</span>
                            <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Pro</span>
                        </div>
                    </div>

                    <LockOverlay isLocked={userTier === 'free'} message="Upgrade to Pro for Multi-Size Export">
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-3 gap-2">
                                {(['1:1', '4:5', '9:16'] as AspectRatio[]).map((ratio) => (
                                    <button
                                        key={ratio}
                                        onClick={() => toggleRatio(ratio)}
                                        className={cn(
                                            "flex flex-col items-center justify-center py-2 rounded-lg border transition-all gap-1",
                                            selectedRatios.includes(ratio)
                                                ? "bg-primary/5 border-primary/20 text-primary"
                                                : "bg-gray-50 border-gray-100 text-gray-400"
                                        )}
                                    >
                                        <div className={cn(
                                            "border-2 rounded-[2px]",
                                            ratio === '1:1' ? "w-4 h-4" : ratio === '4:5' ? "w-3.5 h-4.5" : "w-2.5 h-5",
                                            selectedRatios.includes(ratio) ? "border-primary" : "border-gray-300"
                                        )} />
                                        <span className="text-[9px] font-black">{ratio}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleBulkExport}
                                disabled={isExporting || isBulkExporting || userTier === 'free'}
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-wider shadow-lg shadow-primary/10",
                                    isBulkExporting
                                        ? "bg-primary/20 text-primary cursor-not-allowed"
                                        : "bg-primary text-white hover:bg-primary/90"
                                )}
                            >
                                {isBulkExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                {isBulkExporting ? 'Exporting...' : `Bulk Export (${selectedRatios.length})`}
                            </button>
                        </div>
                    </LockOverlay>
                </div>
            </div>
        </div>
    )
}
