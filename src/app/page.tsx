import type {Metadata} from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Handy Reparatur Rhede | OsiTech Smart Repair',
  description:
    'OsiTech Smart Repair in Rhede repariert Smartphones, iPhones, Samsung Geräte, Tablets und Laptops schnell, transparent und mit Garantie.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
