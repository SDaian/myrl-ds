import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/types/index';
import { formatPrice } from '@/utils/format-price';

type ItemProps = {
  product: Product;
};

export const Item = ({
  product: { id, title, price, hasDiscount, priceAfterDiscount, image },
}: ItemProps) => {
  const formattedPrice = useMemo(() => formatPrice(price), [price]);

  let discountFormattedPrice;
  if (priceAfterDiscount) {
    discountFormattedPrice = formatPrice(priceAfterDiscount);
  }

  return (
    <div className='flex max-w-[180px] md:max-w-[260px] border rounded-lg border-[#e3e3e3] flex-col shadow shadow-slate-200'>
      <div className='h-[220px] md:h-[270px] relative'>
        <Image
          className='rounded-t-lg p-2'
          src={`/images/${image}`}
          alt='product image'
          fill
        />
      </div>
      <div className='pt-1 pb-3 px-2 flex flex-col gap-2'>
        <Link href={`/movie/${id}`}>
          <span className='self-center text-sm font-bold cursor-pointer hover:text-[#01b4e4]'>
            {title}
          </span>
        </Link>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span
              data-testid="normal-price"
              className={`text-sm ${hasDiscount ? 'text-xs line-through' : ''}`}
            >
              {formattedPrice}
            </span>
            {hasDiscount && (
              <span data-testid="discounted-price" className='text-sm text-red-600'>
                {discountFormattedPrice}
              </span>
            )}
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => console.log('search')} // refetch(filters)
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
