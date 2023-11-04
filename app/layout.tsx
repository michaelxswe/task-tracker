import '@radix-ui/themes/styles.css'
import './styles/theme-config.css'
import './styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/local/Navbar'
import { Theme } from '@radix-ui/themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const metadata: Metadata = {
  title: 'Taskflow Manager',
  description: 'Tracks all your tasks'
}

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <Theme appearance='dark' accentColor='blue' className='space-y-5'>
          <Navbar />
          <main className='px-10'>{children}</main>
        </Theme>
      </body>
    </html>
  )
}

export { metadata }
export default HomeLayout
