import './globals.css'
import Navbar from '../components/Navbar'
import { Roboto } from 'next/font/google'
import { Metadata } from 'next'

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone | 旅遊住宿預訂平台',
  description: '使用 Next.js 打造的現代化旅遊住宿預訂網站。輕鬆搜尋、比較並預訂全球各地的優質住宿。',
  keywords: 'Airbnb, 訂房網站, 旅遊住宿, Next.js, TypeScript, TailwindCSS, 線上訂房, 度假租屋',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Navbar />

        <main className='mx-auto max-w-3xl py-10'>{children}</main>
      </body>
    </html>
  )
}
