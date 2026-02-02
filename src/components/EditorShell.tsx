'use client'

import Link from 'next/link'
import { PreviewStage } from './PreviewStage'
import { Controls } from './editor/Controls'
import { useStore, useHydrated } from '@/lib/store'
import { RightPanel } from './editor/RightPanel'
import { Crown, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UndoRedoControls } from './editor/UndoRedoControls'

export const EditorShell = () => {
    const isHydrated = useHydrated()
    const { isProPanelOpen, setIsProPanelOpen, userTier, reset } = useStore()

    if (!isHydrated) return null

    return (
        <div className="relative flex flex-col h-screen bg-background overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-black/5 z-[100] gap-3">
                <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
                    <img src="/logo/Asset 3.svg" alt="Postit Logo" className="h-6 w-auto" />
                </Link>

                {/* Mobile Quick Controls - Grouped on the right */}
                <div className="flex items-center gap-2 justify-end flex-1">
                    <div className="flex items-center gap-2">
                        <UndoRedoControls />
                        <button
                            onClick={reset}
                            className="h-9 w-9 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors bg-white border border-black/5 rounded-lg shadow-sm"
                            title="Reset Canvas"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsProPanelOpen(true)}
                        className={cn(
                            "h-9 flex items-center gap-2 px-4 rounded-full transition-all shrink-0",
                            userTier === 'pro' ? "bg-primary text-white" : "bg-gray-100 text-gray-900 shadow-sm border border-black/5"
                        )}
                    >
                        <Crown size={14} className={cn(userTier === 'pro' && "fill-white")} />
                        <span className="text-[10px] font-black uppercase tracking-wider hidden sm:inline">
                            {userTier === 'pro' ? 'Pro' : 'Upgrade'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-24 lg:gap-0 overflow-y-auto lg:overflow-hidden bg-gray-50/50 lg:bg-transparent">
                {/* Left Column (Desktop) / Bottom Content (Mobile) - Controls */}
                <div className="order-2 lg:order-1 lg:w-[32%] xl:w-[28%] lg:h-full lg:overflow-y-auto p-6 pt-12 lg:px-10 lg:py-16 border-t lg:border-t-0 lg:border-r border-black/5 bg-white">
                    <Controls />
                </div>

                {/* Center Column - Preview Stage */}
                <div className="order-1 lg:order-2 lg:flex-1 lg:w-[50%] xl:w-[54%] flex flex-col items-center lg:justify-center p-4 lg:p-12 pb-12 min-h-[50vh] lg:h-full bg-transparent">
                    <div className="w-full max-w-2xl px-2">
                        <PreviewStage />
                    </div>
                </div>

                {/* Right Column (Desktop) - Pro Panel */}
                <div className="hidden lg:block lg:order-3 lg:w-[20%] xl:w-[20%] border-l border-black/5 h-full bg-white overflow-hidden">
                    <RightPanel />
                </div>
            </div>

            {/* Mobile Drawer (Overlay) */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity lg:hidden",
                    isProPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsProPanelOpen(false)}
            />
            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[110] h-[92dvh] transition-transform duration-500 ease-out lg:hidden overflow-hidden shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.1)]",
                    isProPanelOpen ? "translate-y-0" : "translate-y-full"
                )}
            >
                {/* Drawer handle */}
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-4" />
                <RightPanel />
            </div>
        </div>
    )
}

