'use client'

import { Plus } from 'lucide-react'
import { useStore } from '@/lib/store'

export const ImagePlaceholder = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-gray-200">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                    <Plus size={40} strokeWidth={1.5} className="text-gray-300" />
                </div>
            </div>
        </div>
    )
}
