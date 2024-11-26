import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Star, Music, FileText, Building } from 'lucide-react'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

const userId = await getCurrentUserId();

export default function ProprietarioHome() {
    const sections = [
        {
            title: 'Manage Events',
            icon: CalendarDays,
            href: '/events',
            description: 'Create and manage your events'
        },
        {
            title: 'Manage Establishments',
            icon: Building,
            href: '/establishments',
            description: 'Add and edit your venues and locations'
        },
        {
            title: 'Reviews',
            icon: Star,
            href: '/reviews',
            description: 'View and respond to reviews'
        },
        {
            title: 'Artists',
            icon: Music,
            href: '/artists',
            description: 'Browse and invite artists'
        },
        {
            title: 'Contracts',
            icon: FileText,
            href: `/contracts/${userId}`,
            description: 'Manage event contracts'
        },
    ]

    return (
        <div className="space-y-8 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Welcome to Sua Melodia, Proprietor!</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Manage your events, artists, reviews, and contracts all in one place.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

