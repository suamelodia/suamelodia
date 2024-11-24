import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Users, Music, Star, FileText, Home } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'Artists', href: '/artists/search', icon: Music },
  { name: 'Browse', href: '/events/browse', icon: Users },
  { name: 'Reviews', href: '/reviews', icon: Star },
  { name: 'Contracts', href: '/contracts', icon: FileText },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <header className="bg-white shadow-sm fixed w-full z-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Sua Melodia"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </Link>
                <nav>
                  <ul className="flex space-x-6">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center text-gray-600 hover:text-[#CC3B58] transition-colors"
                        >
                          <item.icon className="w-5 h-5 mr-1" />
                          <span className="hidden md:inline text-sm font-medium">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 pt-20">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-100 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600">
              <p>&copy; 2023 Sua Melodia. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

