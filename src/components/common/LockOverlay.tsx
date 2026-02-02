'use client'

import React from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LockOverlayProps {
    children: React.ReactNode
    isLocked: boolean
    message?: string
    className?: string
}

export const LockOverlay = ({ children, isLocked, message = "Upgrade to Pro to unlock", className }: LockOverlayProps) => {
    if (!isLocked) return <>{children}</>

    return (
        <div className={cn("relative group cursor-not-allowed", className)}>
            {/* Disabled content */}
            <div className="pointer-events-none opacity-50 filter grayscale-[0.5]">
                {children}
            </div>

            {/* Lock Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 shadow-sm border border-black/5 p-1.5 rounded-full transform transition-all group-hover:scale-110">
                    <Lock size={12} className="text-primary" />
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {message}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
        </div>
    )
}
