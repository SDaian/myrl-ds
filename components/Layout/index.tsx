import { ReactNode } from 'react';

//import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh)] flex-col justify-start">
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
