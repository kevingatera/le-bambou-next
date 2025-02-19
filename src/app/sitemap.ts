import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

const BASE_URL = 'https://lebambougorillalodge.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers()
  const host = headersList.get('host') || BASE_URL

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/stay',
    '/stay#Rooms',
    '/stay#Amenities',
    '/stay#Gallery',
    '/explore',
    '/hotel-policies',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/stay') ? 0.9 : 0.8,
  }))

  return [...staticRoutes]
} 