import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/header"
import Footer from "./components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Homir - Connect Caregivers and Care Recipients",
  description: "Find or offer caregiving services with Homir",
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
        <main className="min-h-screen p-4 md:p-8">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

