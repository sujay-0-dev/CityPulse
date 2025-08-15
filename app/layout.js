import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "CityPulse - Real-Time Urban Data Dashboard",
  description:
    "Gamified dashboard for real-time city data including weather, traffic, air quality, and events with Supabase authentication.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
