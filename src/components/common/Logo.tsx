'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    showText?: boolean;
}

export const Logo = ({ className, iconClassName, textClassName, showText = true }: LogoProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <img
                src="/logo/Asset 3.svg"
                alt="Postit Icon"
                className={cn("h-8 w-auto", iconClassName)}
            />
            {showText && (
                <span className={cn("font-black text-xl tracking-tighter flex items-center", textClassName)}>
                    <span className="text-gray-900">Post</span>
                    <span className="text-primary">it</span>
                </span>
            )}
        </div>
    )
}
