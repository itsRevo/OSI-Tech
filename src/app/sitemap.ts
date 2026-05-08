import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://osi-tech.de';
  const routes = [
    '',
    '/services',
    '/preise',
    '/termine',
    '/contact',
    '/rhede',
    '/bocholt',
    '/borken',
    '/impressum',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('rhede') ? 0.9 : 0.8,
  }));
}
