"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDown, Globe } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 z-40 bg-white transition-transform duration-300 ease-in-out lg:hidden border-t",
        isOpen ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="flex flex-col p-4 overflow-y-auto h-full">
        <Link href="/find-care" className="text-2xl py-4 hover:text-[#2B7254] transition-colors" onClick={onClose}>
          Find Care
        </Link>
        <Link
          href="/become-caregiver"
          className="text-2xl py-4 hover:text-[#2B7254] transition-colors"
          onClick={onClose}
        >
          Become a caregiver
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="w-full flex items-center justify-between text-2xl py-4 hover:text-[#2B7254] transition-colors"
          >
            About
            <ChevronDown className={cn("h-6 w-6 transition-transform duration-200", isAboutOpen ? "rotate-180" : "")} />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isAboutOpen ? "max-h-[400px]" : "max-h-0",
            )}
          >
            <div className="pl-4 py-2 space-y-4">
              <Link
                href="/about-us"
                className="block text-lg text-gray-600 hover:text-[#2B7254] transition-colors"
                onClick={onClose}
              >
                About us
              </Link>
              <Link
                href="/our-offerings"
                className="block text-lg text-gray-600 hover:text-[#2B7254] transition-colors"
                onClick={onClose}
              >
                Our offerings
              </Link>
              <Link
                href="/how-it-works"
                className="block text-lg text-gray-600 hover:text-[#2B7254] transition-colors"
                onClick={onClose}
              >
                How Homir works
              </Link>
              <Link
                href="/blog"
                className="block text-lg text-gray-600 hover:text-[#2B7254] transition-colors"
                onClick={onClose}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>

        <Link href="/help" className="text-2xl py-4 hover:text-[#2B7254] transition-colors" onClick={onClose}>
          Help
        </Link>

        <div className="mt-auto pt-4 border-t">
          <button className="flex items-center gap-2 text-xl hover:text-[#2B7254] transition-colors py-4">
            <Globe className="h-5 w-5" />
            <span>EN</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

