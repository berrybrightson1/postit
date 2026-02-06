'use client'

import React, { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { RotateCcw, RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export const UndoRedoControls = () => {
    // Need to useTemporal to access undo/redo. 
    // Typescript might complain if Types weren't updated yet, but zundo adds useTemporal to the store.

    // We access the store directly to get temporal if possible or use a workaround
    // Note: zundo attaches temporal to the store instance, so it might not be directly on the hook return
    // Common pattern: useStore.temporal.getState().undo()

    // However, for reactive state (canUndo/canRedo), we need to subscribe
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    useEffect(() => {
        // @ts-ignore
        const unsub = useStore.temporal.subscribe((state) => {
            setCanUndo(state.pastStates.length > 0)
            setCanRedo(state.futureStates.length > 0)
        })
        return unsub
    }, [])

    const handleUndo = () => {
        // @ts-ignore
        useStore.temporal.getState().undo()
    }

    const handleRedo = () => {
        // @ts-ignore
        useStore.temporal.getState().redo()
    }

    return (
        <div className="flex items-center gap-1 h-full">
            <button
                onClick={handleUndo}
                disabled={!canUndo}
                className={cn(
                    "h-full px-2 rounded-xl hover:bg-white hover:text-primary hover:shadow-sm transition-all",
                    !canUndo && "opacity-30 cursor-not-allowed text-gray-400",
                    canUndo && "text-gray-500"
                )}
                title="Undo (Ctrl+Z)"
            >
                <RotateCcw size={12} strokeWidth={3} />
            </button>
            <div className="w-px h-4 bg-gray-200/50" />
            <button
                onClick={handleRedo}
                disabled={!canRedo}
                className={cn(
                    "h-full px-2 rounded-xl hover:bg-white hover:text-primary hover:shadow-sm transition-all",
                    !canRedo && "opacity-30 cursor-not-allowed text-gray-400",
                    canRedo && "text-gray-700"
                )}
                title="Redo (Ctrl+Y)"
            >
                <RotateCw size={12} strokeWidth={3} />
            </button>
        </div>
    )
}
