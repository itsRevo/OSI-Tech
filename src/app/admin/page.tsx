import type {Metadata} from 'next';
import AdminPricingPage from '@/components/admin/AdminPricingPage';

export const metadata: Metadata = {
  title: 'Admin Preisverwaltung',
  description: 'Admin-Bereich zur dynamischen Preisverwaltung.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPricingPage />;
}
