"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import MobileMenu from "./mobile-menu"

// Mock data for resources dropdown
const resourcesDropdownData = [
    { title: "Documentation", href: "/resources/docs", description: "API docs and guides" },
    { title: "Tutorials", href: "/resources/tutorials", description: "Step-by-step tutorials" },
    { title: "Blog", href: "/resources/blog", description: "Latest updates and insights" },
    { title: "Community", href: "/resources/community", description: "Join our community" },
]

// Theme Toggle Component
function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    )
}

// Resources Dropdown Component
function ResourcesDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    pathname.startsWith("/resources")
                        ? "text-[#7A7FEE] bg-[#7A7FEE]/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#111111] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                    <div className="p-2">
                        {resourcesDropdownData.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function FloatingNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push("/")
    }

    const logoSrc = mounted && resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-40 p-4 sm:p-6">
                <nav className="mx-auto max-w-7xl bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl rounded-full shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between px-6 sm:px-8 py-3 sm:py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center flex-shrink-0" onClick={handleLogoClick}>
                            {mounted ? (
                                <Image
                                    src={logoSrc || "/placeholder.svg"}
                                    alt="Logo"
                                    width={140}
                                    height={35}
                                    className="h-8 sm:h-9 w-auto"
                                    priority
                                />
                            ) : (
                                <div className="h-8 sm:h-9 w-[120px] sm:w-[140px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            )}
                        </Link>

                        {/* Navigation & Actions - All on Right */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-2">
                                <ResourcesDropdown />

                                <Link
                                    href="/portfolio"
                                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-colors ${
                                        pathname === "/portfolio"
                                            ? "text-[#7A7FEE] bg-[#7A7FEE]/10"
                                            : "text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Portfolio
                                </Link>

                                <Link
                                    href="/start"
                                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-colors ${
                                        pathname === "/start"
                                            ? "text-[#7A7FEE] bg-[#7A7FEE]/10"
                                            : "text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Start Project
                                </Link>
                            </div>

                            <ThemeToggle />

                            {/* Login Button - Desktop */}
                            <Link
                                href="/login"
                                className="hidden lg:inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium text-[#7A7FEE] hover:text-white hover:bg-[#7A7FEE] border-2 border-[#7A7FEE] transition-all duration-200"
                            >
                                Login
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
                                aria-label="Toggle menu"
                            >
                                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Header Spacer - Automatically pushes content below fixed header */}
            <div className="h-32" />

            {/* Mobile Menu */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    )
}