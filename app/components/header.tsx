"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
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
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

