import { Rubik } from 'next/font/google'
import './globals.css'

const rubikFont = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Daymocracy',
  description: 'Vote once, every day.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`container mx-auto min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 p-10 text-indigo-100 lg:p-24 ${rubikFont.className}`}
      >
        {children}
      </body>
    </html>
  )
}
