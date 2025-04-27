import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

// const geist = Geist_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VibeSense",
  description: "Immersive web application for emotion detection and sentiment analysis.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      {/* <body className={`${geist.className} bg-[#0A1F44] text-[#D1D1D1]`}> */}
      <body className="bg-[#0A1F44] text-[#D1D1D1]" style={{ fontFamily: 'Geist, sans-serif' }}>

        <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1b2444]">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'