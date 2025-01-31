import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/header"
import Footer from "./components/footer" // Changed to default import
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Homir - Find Care Services Near You",
  description: "Connect with trusted caregivers for home care, senior care, and child care services.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

