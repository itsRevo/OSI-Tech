import type {Metadata} from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: 'OsiTech Smart Repair',
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
