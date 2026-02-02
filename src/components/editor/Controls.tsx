'use client'

import React from 'react'
import { TemplateSelector } from './TemplateSelector'
import { TextInputs } from './TextInputs'
import { MediaUpload } from './MediaUpload'
import { StyleSettings } from './StyleSettings'
import { ExportControls } from './ExportControls'
import { StickerControls } from './StickerControls'
import { useStore } from '@/lib/store'
import { Trash2 } from 'lucide-react'
import { UndoRedoControls } from './UndoRedoControls'

export const Controls = () => {
    const { reset } = useStore()

    return (
        <div className="flex flex-col gap-12 pb-20">
            <header className="hidden lg:flex justify-between items-end border-b border-gray-100 pb-8">
                <div>
                    <img src="/logo/Asset 3.svg" alt="Postit Logo" className="h-10 w-auto" />
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
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">1 // Select Template</h3>
                <TemplateSelector />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">2 // Content</h3>
                <TextInputs />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">3 // Assets</h3>
                <MediaUpload />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">3.5 // Stickers & Text</h3>
                <StickerControls />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">4 // Style</h3>
                <StyleSettings />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">5 // Finish</h3>
                <ExportControls />
            </section>
        </div>
    )
}
