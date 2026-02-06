'use client'

import React from 'react'
import { TemplateSelector } from './TemplateSelector'
import { TextInputs } from './TextInputs'
import { AestheticsSettings } from './AestheticsSettings'
import { ExportControls } from './ExportControls'
import { useStore } from '@/lib/store'

export const Controls = () => {
    const { reset, templateId, aspectRatio, setAspectRatio } = useStore() // Add aspectRatio, setAspectRatio

    // Force 16:9 for YouTube Thumbnail to override any persisted state (Desktop & Mobile)
    React.useEffect(() => {
        if (templateId === 'YouTubeThumbnail' && aspectRatio !== '16:9') {
            setAspectRatio('16:9')
        }
    }, [templateId, aspectRatio, setAspectRatio])

    return (
        <div className="flex flex-col gap-8 lg:gap-12 pb-20">
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
                </div>
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">3 // Aesthetics</h3>
                <AestheticsSettings />
            </section>

            <section>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">5 // Finish</h3>
                <ExportControls />
            </section>
        </div>
    )
}
