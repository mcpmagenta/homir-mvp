"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Left section */}
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-bold text-[#2B7254]">
              Homir
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/receive-care"
                className={`text-sm font-medium ${pathname === "/receive-care" ? "text-primary" : "text-foreground"}`}
              >
                Receive Care
              </Link>
              <Link
                href="/caregiver"
                className={`text-sm font-medium ${pathname === "/caregiver" ? "text-primary" : "text-foreground"}`}
              >
                Caregiver
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium -ml-4 h-auto px-4 py-2">
                    About <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/about-us" className="w-full">
                      About us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/our-offerings" className="w-full">
                      Our offerings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/how-it-works" className="w-full">
                      How Homir works
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6 ml-auto">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <Globe className="h-4 w-4" />
              EN
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/help">Help</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" className="bg-[#2B7254] text-white hover:bg-[#236344]" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

