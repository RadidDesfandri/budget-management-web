import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Providers from "./providers"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    template: "%s | Budget Management App",
    default: "Budget Management App"
  },
  description:
    "A comprehensive solution for managing organization budgets, tracking expenses, and viewing audit trails.",
  openGraph: {
    title: "Budget Management App",
    description: "Multi-tenant budget management platform.",
    type: "website"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
