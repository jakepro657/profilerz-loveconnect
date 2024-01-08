import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecoilRootProvider from '@/components/RecoilRootProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '러브커넥트',
  description: '여러분이 좋아하는 사람과 채팅해보세요!',
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
