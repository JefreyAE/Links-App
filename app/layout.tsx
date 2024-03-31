import { GeistSans } from 'geist/font/sans'
import './globals.css'
import AuthButton from '@/components/AuthButton'
import Header from '@/components/Header'
import ListTable from '@/components/lists/ListTable'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav className="w-full content-end flex justify-right border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-end p-3 text-sm">
              <AuthButton />
            </div>
          </nav>
          {children}
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
              Jefrey AE
            </p>
          </footer>
        </main>
      </body>
    </html>
  )
}
