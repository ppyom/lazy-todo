import AppLayout from '@/components/layout/app-layout';
import BackButton from '@/components/layout/back-button';
import Header from '@/components/layout/header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <AppLayout>
      <Header left={<BackButton />} />
      <main>{children}</main>
    </AppLayout>
  );
}
