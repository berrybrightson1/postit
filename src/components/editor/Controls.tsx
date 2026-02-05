'use client'

import React from 'react'
import { TemplateSelector } from './TemplateSelector'
import { TextInputs } from './TextInputs'
import { MediaUpload } from './MediaUpload'
import { CanvasSettings } from './CanvasSettings'
import { TypographySettings } from './TypographySettings'
import { AestheticsSettings } from './AestheticsSettings'
import { ExportControls } from './ExportControls'
import { StickerControls } from './StickerControls'
import { useStore } from '@/lib/store'
import { Trash2 } from 'lucide-react'
import { UndoRedoControls } from './UndoRedoControls'
import { Logo } from '../common/Logo'

export const Controls = () => {
    const { reset } = useStore()

    return (
        <div className="flex flex-col gap-8 lg:gap-12 pb-20">
            <header className="hidden lg:flex justify-between items-end border-b border-gray-100 pb-8">
                <div>
                    <Logo iconClassName="h-10" textClassName="text-2xl" />
                </div>
                <div className="flex items-center gap-2">
                    <UndoRedoControls />
                    <button
                        onClick={reset}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        title="Reset Canvas"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4 lg:mb-6">1 // Foundation</h3>
                <div className="flex flex-col gap-4 lg:gap-6">
                    <TemplateSelector />
                </div>
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4 lg:mb-6">2 // Message</h3>
                <div className="flex flex-col gap-4 lg:gap-6">
                    <TextInputs />
                    <TypographySettings />
                </div>
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">3 // Aesthetics</h3>
                <AestheticsSettings />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">4 // Enhancements</h3>
                <div className="flex flex-col gap-6">
                    <MediaUpload />
                </div>
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">5 // Finish</h3>
                <ExportControls />
            </section>
        </div>
    )
}
