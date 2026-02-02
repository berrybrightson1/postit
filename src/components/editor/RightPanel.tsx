'use client'

import React, { useState } from 'react'
import { useStore } from '@/lib/store'
import { User, LogIn, Crown, X, Mail, Lock, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PricingSection } from './PricingSection'

export const RightPanel = () => {
    const { isAuthenticated, user, setIsProPanelOpen, setAuthenticated, setUser } = useStore()
    const [activeTab, setActiveTab] = useState<'auth' | 'pro'>('pro')
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup')

    const handleMockLogin = () => {
        setAuthenticated(true)
        setUser({ name: 'Creative Designer', avatar: '' })
        setActiveTab('pro')
    }

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Crown size={16} className="text-primary" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">Pro Panel</span>
                </div>
                <button
                    onClick={() => setIsProPanelOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Close Panel"
                >
                    <X size={18} />
                </button>
            </div>

            {/* User Profile Hook (If Logged In) */}
            {isAuthenticated && user && (
                <div className="px-6 py-4 bg-gray-50/50 border-b border-black/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900">{user.name}</span>
                        <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                            <Crown size={10} className="fill-primary" />
                            Pro Member
                        </span>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100/50 mx-6 mt-6 rounded-xl border border-black/5">
                <button
                    onClick={() => setActiveTab('auth')}
                    title="Account Settings"
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                        activeTab === 'auth' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <User size={14} />
                    Account
                </button>
                <button
                    onClick={() => setActiveTab('pro')}
                    title="Pricing and Upgrades"
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                        activeTab === 'pro' ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Crown size={14} />
                    Upgrade
                </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'auth' ? (
                    isAuthenticated ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <UserCircle size={32} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm font-black uppercase tracking-wider">You're all set!</h3>
                                <p className="text-[10px] font-bold text-gray-500 leading-relaxed px-8">
                                    Your designs are automatically synced to the cloud.
                                </p>
                            </div>
                            <button
                                onClick={() => { setAuthenticated(false); setUser(null); }}
                                className="mt-4 text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                                title="Sign Out"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm font-black uppercase tracking-wider">
                                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                                </h3>
                                <p className="text-[10px] font-bold text-gray-500 leading-relaxed">
                                    {authMode === 'login'
                                        ? 'Sign in to access your saved designs.'
                                        : 'Join to save your work across all your devices.'}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="auth-email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="auth-email"
                                            type="email"
                                            placeholder="hello@postit.app"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="auth-password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="auth-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleMockLogin}
                                className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                title={authMode === 'login' ? 'Sign In' : 'Create Account'}
                            >
                                {authMode === 'login' ? 'Sign In' : 'Create Account'}
                            </button>

                            <div className="text-center">
                                <button
                                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                                    className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors"
                                >
                                    {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <PricingSection />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-black/5 bg-gray-50/50">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-loose text-center">
                    Secure payments via Paystack.<br />
                    All cloud data encrypted.
                </p>
            </div>
        </div>
    )
}
