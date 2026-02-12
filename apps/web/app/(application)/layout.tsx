import Header from '@/components/layout/header';
import Navbar from '@/components/layout/navbar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navbar />
    </>
  );
}
