import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Music, Star, FileText } from 'lucide-react'

export default function HomeScreen() {
  const sections = [
    {
      title: 'Manage Events',
      icon: CalendarDays,
      href: '/events',
      description: 'Create, edit, and manage your events'
    },
    {
      title: 'Artists',
      icon: Music,
      href: '/artists/search',
      description: 'Search and invite artists to your events'
    },
    {
      title: 'Browse Events',
      icon: Users,
      href: '/events/browse',
      description: 'Find and apply for upcoming events'
    },
    {
      title: 'Reviews',
      icon: Star,
      href: '/reviews',
      description: 'Manage and view reviews for artists and venues'
    },
    {
      title: 'Contracts',
      icon: FileText,
      href: '/contracts',
      description: 'View and manage your contracts'
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Sua Melodia</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your all-in-one platform for connecting artists and event organizers
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Link href={section.href} key={index} className="block group">
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-col items-center space-y-4 pt-6">
                <div className="p-3 rounded-full bg-white border-2 border-[#CC3B58] text-[#CC3B58] 
                              group-hover:bg-[#CC3B58] group-hover:text-white transition-colors">
                  <section.icon size={24} />
                </div>
                <CardTitle className="text-gray-900 group-hover:text-[#CC3B58] transition-colors">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 text-sm">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

