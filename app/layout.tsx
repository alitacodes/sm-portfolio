import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Chatbot } from "@/components/chatbot"

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sneha Mandal's Portfolio",
  description: "Full-Stack Developer & UI/UX Designer crafting digital experiences that inspire and engage",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rubik.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
