"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"
import MenuIcon from "./menu-icon"
import Logo from "./logo"
import { SignupOverlay } from "./signup-overlay"

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 border-b bg-background z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-8">
              <Link href="/" aria-label="Homir" className="flex items-center">
                <Logo />
              </Link>
              <nav className="hidden lg:flex items-center space-x-6">
                <Link
                  href="/find-care"
                  className="text-base rounded-full px-4 py-2 transition-colors hover:bg-black/5 flex items-center h-[38px]"
                >
                  Find Care
                </Link>
                <Link
                  href="/become-caregiver"
                  className="text-base rounded-full px-4 py-2 transition-colors hover:bg-black/5 flex items-center h-[38px]"
                >
                  Become a caregiver
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-base rounded-full px-4 py-2 transition-colors hover:bg-black/5 flex items-center h-[38px]">
                    About <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <div className="relative">
                    <DropdownMenuContent
                      align="start"
                      sideOffset={11.75}
                      className="w-56 p-0 bg-white border shadow-lg rounded-none rounded-b-xl"
                    >
                      <div>
                        <div className="hover:bg-[#f1f1f1] transition-colors">
                          <DropdownMenuItem asChild className="rounded-none focus:bg-transparent">
                            <Link href="/about-us" className="w-full px-4 py-2.5 block text-base">
                              About us
                            </Link>
                          </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-[#f1f1f1] transition-colors">
                          <DropdownMenuItem asChild className="focus:bg-transparent">
                            <Link href="/blog" className="w-full px-4 py-2.5 block text-base">
                              Blog
                            </Link>
                          </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-[#f1f1f1] transition-colors">
                          <DropdownMenuItem asChild className="focus:bg-transparent">
                            <Link href="/our-offerings" className="w-full px-4 py-2.5 block text-base">
                              Our offerings
                            </Link>
                          </DropdownMenuItem>
                        </div>
                        <div className="hover:bg-[#f1f1f1] transition-colors">
                          <DropdownMenuItem asChild className="focus:bg-transparent">
                            <Link href="/how-it-works" className="w-full px-4 py-2.5 block text-base">
                              How Homir works
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </nav>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button className="hidden lg:flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-black/5 h-[38px]">
                <Globe className="h-5 w-5" />
                <span className="text-base">EN</span>
              </button>
              <Link
                href="/help"
                className="hidden lg:flex text-base rounded-full px-4 py-2 transition-colors hover:bg-black/5 items-center h-[38px]"
              >
                Help
              </Link>
              <Link
                href="/login"
                className="text-base rounded-full px-4 py-2 transition-colors hover:bg-black/5 flex items-center h-[38px]"
              >
                Log in
              </Link>
              <Button
                className="bg-[#407A59] text-white px-4 py-2 rounded-lg hover:bg-[#407A59]/90 text-base whitespace-nowrap flex items-center h-[38px]"
                onClick={() => {
                  console.log("Signup button clicked")
                  setIsSignupOpen(true)
                }}
              >
                Sign up
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MenuIcon isOpen={isMobileMenuOpen} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SignupOverlay isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  )
}

