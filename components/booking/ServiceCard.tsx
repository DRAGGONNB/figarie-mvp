import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  slug: string
  name: string
  icon: string
  description: string
  category: string
}

export function ServiceCard({ slug, name, icon, description, category }: ServiceCardProps) {
  return (
    <Card className="figarie-card h-full flex flex-col hover:border-figarie-gold transition-all duration-300">
      <CardHeader>
        <div className="text-5xl mb-4">{icon}</div>
        <CardTitle className="figarie-heading text-xl mb-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs uppercase tracking-wide text-figarie-gold">
          {category.replace('_', ' ')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/book/${slug}`} className="w-full">
          <Button className="w-full figarie-button">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
