'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import { TemplateBackdrop } from './shared/TemplateBackdrop'
import { TemplateLogo } from './shared/TemplateLogo'

// Default Instagram logo - simplified gradient version
const INSTAGRAM_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImlnMSIgY3g9IjMwJSIgY3k9IjEwNyUiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZERjQ5NzsiLz48c3RvcCBvZmZzZXQ9IjAuNSIgc3R5bGU9InN0b3AtY29sb3I6I0ZENzk0OTsiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNENjI5NzY7Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImlnMiIgY3g9IjUwJSIgY3k9IjAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiM0RjVCRDU7Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNTE1QkQ0O3N0b3Atb3BhY2l0eTowOyIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjEyIiBmaWxsPSJ1cmwoI2lnMSkiLz48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0idXJsKCNpZzIpIi8+PHBhdGggZD0iTTI0IDE0QzE5LjYgMTQgMTkuMSAxNC4wMiAxNy4zIDE0LjFDMTUuNSAxNC4xOCAxNC4xIDE0LjUgMTMgMTUuMUMxMS45IDE1LjcgMTAuOSAxNi41IDEwIDE3LjVDOS4xIDE4LjUgOC4zIDE5LjUgNy43IDIwLjZDNy4xIDIxLjcgNi43OCAyMy4xIDYuNyAyNC45QzYuNjIgMjYuNyA2LjYgMjcuMiA2LjYgMzEuNkM2LjYgMzYgNi42MiAzNi41IDYuNyAzOC4zQzYuNzggNDAuMSA3LjEgNDEuNSA3LjcgNDIuNkM4LjMgNDMuNyA5LjEgNDQuNyAxMCA0NS43QzEwLjkgNDYuNyAxMS45IDQ3LjUgMTMgNDguMUMxNC4xIDQ4LjcgMTUuNSA0OS4wMiAxNy4zIDQ5LjFDMTkuMSA0OS4xOCAxOS42IDQ5LjIgMjQgNDkuMkMyOC40IDQ5LjIgMjguOSA0OS4xOCAzMC43IDQ5LjFDMzIuNSA0OS4wMiAzMy45IDQ4LjcgMzUgNDguMUMzNi4xIDQ3LjUgMzcuMSA0Ni43IDM4IDQ1LjdDMzguOSA0NC43IDM5LjcgNDMuNyA0MC4zIDQyLjZDNDAuOSA0MS41IDQxLjIyIDQwLjEgNDEuMyAzOC4zQzQxLjM4IDM2LjUgNDEuNCAzNiA0MS40IDMxLjZDNDEuNCAyNy4yIDQxLjM4IDI2LjcgNDEuMyAyNC45QzQxLjIyIDIzLjEgNDAuOSAyMS43IDQwLjMgMjAuNkMzOS43IDE5LjUgMzguOSAxOC41IDM4IDE3LjVDMzcuMSAxNi41IDM2LjEgMTUuNyAzNSAxNS4xQzMzLjkgMTQuNSAzMi41IDE0LjE4IDMwLjcgMTQuMUMyOC45IDE0LjAyIDI4LjQgMTQgMjQgMTRaTTI0IDE3LjZDMjguMyAxNy42IDI4Ljc1IDE3LjYyIDMwLjUgMTcuN0MzMi4yIDE3Ljc4IDMzLjEgMTguMSAzMy43IDE4LjRDMzQuNSAxOC43NSAzNS4xIDE5LjEgMzUuNyAxOS43QzM2LjMgMjAuMyAzNi43IDIwLjkgMzcuMDUgMjEuN0MzNy4zIDIyLjMgMzcuNjIgMjMuMiAzNy43IDI0LjlDMzcuNzggMjYuNyAzNy44IDI3LjIgMzcuOCAzMS42QzM3LjggMzYgMzcuNzggMzYuNSAzNy43IDM4LjNDMzcuNjIgNDAgMzcuMyA0MC45IDM3LjA1IDQxLjVDMzYuNyA0Mi4zIDM2LjMgNDIuOSAzNS43IDQzLjVDMzUuMSA0NC4xIDM0LjUgNDQuNSAzMy43IDQ0Ljg1QzMzLjEgNDUuMSAzMi4yIDQ1LjQyIDMwLjUgNDUuNUMyOC43IDQ1LjU4IDI4LjIgNDUuNiAyNCA0NS42QzE5LjggNDUuNiAxOS4zIDQ1LjU4IDE3LjUgNDUuNUMxNS44IDQ1LjQyIDE0LjkgNDUuMSAxNC4zIDQ0Ljg1QzEzLjUgNDQuNSAxMi45IDQ0LjEgMTIuMyA0My41QzExLjcgNDIuOSAxMS4zIDQyLjMgMTAuOTUgNDEuNUMxMC43IDQwLjkgMTAuMzggNDAgMTAuMyAzOC4zQzEwLjIyIDM2LjUgMTAuMiAzNiAxMC4yIDMxLjZDMTAuMiAyNy4yIDEwLjIyIDI2LjcgMTAuMyAyNC45QzEwLjM4IDIzLjIgMTAuNyAyMi4zIDEwLjk1IDIxLjdDMTEuMyAyMC45IDExLjcgMjAuMyAxMi4zIDE5LjdDMTIuOSAxOS4xIDEzLjUgMTguNzUgMTQuMyAxOC40QzE0LjkgMTguMSAxNS44IDE3Ljc4IDE3LjUgMTcuN0MxOS4yNSAxNy42MiAxOS43IDE3LjYgMjQgMTcuNloiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTI0IDM1QzIwLjEgMzUgMTcgMzEuOSAxNyAyOEMxNyAyNC4xIDIwLjEgMjEgMjQgMjFDMjcuOSAyMSAzMSAyNC4xIDMxIDI4QzMxIDMxLjkgMjcuOSAzNSAyNCAzNVpNMjQgMjQuNkMyMi4xIDI0LjYgMjAuNiAyNi4xIDIwLjYgMjhDMjAuNiAyOS45IDIyLjEgMzEuNCAyNCAzMS40QzI1LjkgMzEuNCAyNy40IDI5LjkgMjcuNCAyOEMyNy40IDI2LjEgMjUuOSAyNC42IDI0IDI0LjZaIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjMxLjUiIGN5PSIyMC41IiByPSIxLjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+'

export const InstagramPost = () => {
    const {
        headline,
        body,
        footer,
        email,
        brandingLine1,
        brandingLine2,
        primaryColor,
        textColor,
        backgroundColor,
        bodySize,
        fontFamily,
        textAlign,
        logo,
        profileImage,
        setProfileImage
    } = useStore()

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return (
        <div className="w-full h-full relative overflow-hidden bg-white flex flex-col">
            {/* Header / User Info */}
            <div className="flex items-center justify-between p-4 z-10 bg-white">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src={profileImage || INSTAGRAM_LOGO} className="w-full h-full object-cover" alt="Profile" />
                        {/* Story ring */}
                        <div className="absolute inset-0 rounded-full border-[2px] border-transparent group-hover:border-pink-500 transition-all pointer-events-none" />
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    setProfileImage(reader.result as string)
                                }
                                reader.readAsDataURL(file)
                            }
                        }}
                    />
                    <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">{headline}</h3>
                        {footer && <p className="text-xs text-gray-500">{footer}</p>}
                    </div>
                </div>
                <div className="text-gray-900 font-bold text-xl tracking-widest">...</div>
            </div>

            {/* Main Content Area (Image) */}
            <div className="relative w-full flex-1 bg-gray-50 overflow-hidden">
                <TemplateBackdrop className="opacity-100" />
                <TemplateLogo mode="draggable" />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white z-10">
                <div className="flex items-center gap-4 text-gray-900">
                    <Heart size={24} className="hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
                    <MessageCircle size={24} className="hover:text-blue-500 transition-colors cursor-pointer" />
                    <Send size={24} className="hover:text-green-500 transition-colors cursor-pointer" />
                </div>
                <Bookmark size={24} className="text-gray-900 hover:text-yellow-500 hover:fill-yellow-500 transition-colors cursor-pointer" />
            </div>

            {/* Caption Area */}
            <div className="px-4 pb-4 bg-white z-10">
                {email && <div className="text-sm font-bold text-gray-900 mb-1">{email}</div>}
                <div className="text-sm text-gray-900">
                    <span className="font-bold mr-2">{headline}</span>
                    <span
                        style={{
                            fontSize: `calc(1em * ${bodySize})`,
                            fontFamily,
                            textAlign: textAlign as any,
                            color: textColor === '#FFFFFF' ? '#000000' : textColor // Force visible text if default white
                        }}
                    >
                        {body}
                    </span>
                </div>

                {/* Branding Footer */}
                {(brandingLine1 || brandingLine2) && (
                    <div style={{ color: primaryColor }} className="mt-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {brandingLine1} {brandingLine2}
                    </div>
                )}
            </div>
        </div>
    )
}
