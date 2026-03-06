import AppLayout from '@/components/layout/app-layout';
import Header from '@/components/layout/header';
import Navbar from '@/components/layout/navbar';
import OfflineBanner from '@/components/layout/offline-banner';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <AppLayout>
      <Header />
      <OfflineBanner />
      <main className="min-h-0 flex-1">{children}</main>
      <Navbar />
    </AppLayout>
  );
}
