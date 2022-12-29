import Link from 'next/link';

import { CartIcon } from '@/components/Icons/cart-icon';

export const Navbar = () => {
  return (
    <header className="h-16 bg-[#042541] flex justify-center items-center">
      <nav className="w-full flex items-center justify-between px-8 max-w-6xl mx-auto">
        <div>
          <Link href={'/'} data-testid="navbar-link">
            <small className="text-3xl text-white font-bold">Store DS</small>
          </Link>
        </div>
        <CartIcon />
      </nav>
    </header>
  );
};
