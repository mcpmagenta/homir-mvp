"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { SignupOverlay } from "./signup-overlay"

export function Header() {
  const pathname = usePathname()
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                Homir
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/search"
                className={`text-sm ${pathname === "/search" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                Find Care
              </Link>
              <Link
                href="/jobs"
                className={`text-sm ${pathname === "/jobs" ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                Jobs
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Globe className="h-4 w-4" />
                    EN
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Español</DropdownMenuItem>
                  <DropdownMenuItem>Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Button
                size="sm"
                className="bg-[#407A59] hover:bg-[#407A59]/90 text-white"
                onClick={() => setIsSignupOpen(true)}
              >
                Sign up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <SignupOverlay isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  )
}

