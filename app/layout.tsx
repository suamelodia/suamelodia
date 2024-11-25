import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Users, Music, Star, FileText, Home, ClipboardEditIcon } from 'lucide-react'
import { getArtistaByUserId } from '@/lib/artista'
import { getEstabelecimentoByProprietarioId } from '@/lib/estabelecimento'
import { getUserById } from '@/lib/usuario'

const inter = Inter({ subsets: ['latin'] })

async function getCurrentUserId() {
  return process.env.USER_ID;
}

const userId = await getCurrentUserId();
const user = await getUserById(userId);
const artist = await getArtistaByUserId(userId);
const establishment = await getEstabelecimentoByProprietarioId(userId);

const artistNavItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Browse Events', href: '/events/browse', icon: CalendarDays },
  { name: 'Reviews', href: '/reviews', icon: Star },
  { name: 'Contracts', href: '/contracts', icon: FileText },
  { name: 'Aplicações', href: `/applies/${userId}`, icon: ClipboardEditIcon },
]

const proprietarioNavItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Manage Events', href: '/events', icon: CalendarDays },
  { name: 'Artists', href: '/artists', icon: Music },
  { name: 'Reviews', href: '/reviews', icon: Star },
  { name: 'Contracts', href: '/contracts', icon: FileText },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('artist', artist)
  console.log('establishment', establishment)
  const navItems = artist ? artistNavItems : proprietarioNavItems

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
                    width={3728}
                    height={1072}
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

