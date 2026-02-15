import AppLayout from '@/components/layout/app-layout';
import Header from '@/components/layout/header';
import Navbar from '@/components/layout/navbar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <AppLayout>
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Navbar />
    </AppLayout>
  );
}
