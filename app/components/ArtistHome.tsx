import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star, FileText, ClipboardEditIcon } from 'lucide-react'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

const userId = await getCurrentUserId();


export default function ArtistHome() {
    const sections = [
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
            description: 'View your reviews and ratings'
        },
        {
            title: 'Applies',
            icon: ClipboardEditIcon,
            href: `/applies/${userId}`,
            description: 'Manage your applies'
        },
    ]

    return (
        <div className="space-y-8 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Welcome to ShowMatch, Artist!</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Explore opportunities, manage your reviews, and handle your contracts all in one place.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

