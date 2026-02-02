'use client'

import React from 'react'
import { Check, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export const PricingSection = () => {
    const { userTier, setUserTier } = useStore()

    const tiers = [
        {
            id: 'free',
            name: 'Basic',
            price: 'Free',
            description: 'Essential tools for casual creators.',
            features: [
                'Low-Res Export',
                'Basic Templates Only',
                'Standard Watermark',
                'Core Features Only'
            ],
            cta: 'Current Plan',
            active: userTier === 'free'
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 'GHS 20',
            period: '/mo',
            description: 'Unlock full creative freedom.',
            features: [
                'Remove Watermark',
                'Custom Hex & Branding',
                'All Quick Themes',
                'High-Res HD Export',
                'Premium Templates'
            ],
            cta: 'Upgrade Now',
            active: userTier === 'pro',
            highlight: true
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            {tiers.map((tier) => (
                <div
                    key={tier.id}
                    className={cn(
                        "relative p-5 rounded-2xl transition-all border",
                        tier.highlight
                            ? "bg-primary text-white border-transparent shadow-xl shadow-primary/20"
                            : "bg-gray-50 border-black/5 text-gray-900"
                    )}
                >
                    {tier.highlight && (
                        <div className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                            <Zap size={14} className="fill-white" />
                        </div>
                    )}

                    <div className="flex flex-col gap-1 mb-4">
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            tier.highlight ? "text-white/60" : "text-primary/60"
                        )}>
                            {tier.name}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">{tier.price}</span>
                            {tier.period && <span className="text-xs opacity-60 font-bold">{tier.period}</span>}
                        </div>
                        <p className={cn(
                            "text-[10px] font-medium leading-relaxed opacity-80",
                            tier.highlight ? "text-white" : "text-gray-500"
                        )}>
                            {tier.description}
                        </p>
                    </div>

                    <ul className="flex flex-col gap-2 mb-6">
                        {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] font-bold">
                                <div className={cn(
                                    "p-0.5 rounded-full shrink-0",
                                    tier.highlight ? "bg-white/20" : "bg-primary/10"
                                )}>
                                    <Check size={8} className={tier.highlight ? "text-white" : "text-primary"} />
                                </div>
                                <span className="opacity-90">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => tier.id === 'pro' && setUserTier('pro')}
                        disabled={tier.active}
                        className={cn(
                            "w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            tier.active
                                ? (tier.highlight ? "bg-white/20 cursor-default" : "bg-black/5 text-gray-400 cursor-default")
                                : (tier.highlight ? "bg-white text-primary hover:bg-gray-50 shadow-lg" : "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/10")
                        )}
                    >
                        {tier.active ? 'Active Plan' : tier.cta}
                    </button>
                </div>
            ))}

            {/* Dev Toggle Helper */}
            {userTier === 'pro' && (
                <button
                    onClick={() => setUserTier('free')}
                    className="text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors mt-2 self-center"
                >
                    Dev: Back to Free
                </button>
            )}
        </div>
    )
}
