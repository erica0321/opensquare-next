import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ToastProvider from '@components/ToastProvider'
import Header from './components/Header'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: '오픈 스퀘어 - 모든 주제로 대화하기',
  description: '고민만 올리면 빠른 답변부터 지식 확장까지!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <Header />
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
