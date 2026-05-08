import type {Metadata} from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://osi-tech.de'),
  title: {
    default: 'OsiTech Smart Repair | Handy Reparatur in Rhede',
    template: '%s | OsiTech Smart Repair',
  },
  description:
    'Professionelle Handy-, Smartphone-, Tablet- und Laptop-Reparatur in Rhede für Kunden aus Rhede, Bocholt, Borken und Umgebung.',
  keywords: [
    'Handy Reparatur Rhede',
    'iPhone Reparatur Rhede',
    'Samsung Reparatur Bocholt',
    'Smartphone Reparatur Borken',
    'Display Reparatur',
    'Akku Austausch',
    'OsiTech',
  ],
  authors: [{name: 'OsiTech Smart Repair'}],
  creator: 'OsiTech Smart Repair',
  publisher: 'OsiTech Smart Repair',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://osi-tech.de',
    siteName: 'OsiTech Smart Repair',
    title: 'OsiTech Smart Repair | Handy Reparatur in Rhede',
    description:
      'Schnelle Smartphone-, Tablet- und Laptop-Reparatur in Rhede mit transparenten Preisen und Garantie.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen bg-white">
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
