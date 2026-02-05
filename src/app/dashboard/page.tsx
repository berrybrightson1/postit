'use client'

import React, { useState, useEffect } from 'react'
import { EditorShell } from "@/components/EditorShell"
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow"
import { useStore } from "@/lib/store"

export default function Dashboard() {
    const { hasOnboarded } = useStore()
    const [isMounted, setIsMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <main>
            {!hasOnboarded && <OnboardingFlow />}
            {/* We render EditorShell behind it (or just mount it) so it's ready */}
            <EditorShell />
        </main>
    )
}
