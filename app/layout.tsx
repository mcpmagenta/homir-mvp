import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/header"
import Footer from "./components/footer"
import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

