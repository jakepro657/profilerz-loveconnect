import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecoilRootProvider from '@/components/RecoilRootProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '러브커넥트',
  description: '마음이 숭실숭실',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  )
}
