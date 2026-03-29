import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

const BASE_URL = 'https://lebambougorillalodge.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await Promise.resolve(headers())
  const host = headersList.get('host') ?? BASE_URL

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/stay',
    '/family-cottage',
    '/stay#Rooms',
    '/stay#Amenities',
    '/stay#Gallery',
    '/explore',
    '/hotel-policies',
  ].map((route) => ({
    url: `${host}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/stay') ? 0.9 : 0.8,
  }))

  return [...staticRoutes]
} 
