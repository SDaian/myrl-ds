import { ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Product, SORT_TYPE } from '@/types/index';
import { Item } from '@/components/Item';
import { Pagination } from '@/components/Pagination';
import { Filters } from '../Filters';

const ITEMS_PER_PAGE = 8;

type ResultsProps = {
  products: Product[];
};

export const Results = ({ products }: ResultsProps) => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    order: '',
    text: '',
  });
  const [currentPage, setCurrentPage] = useState(0);

  const { after = 0 } = router.query;

  const data = useMemo(() => {
    if (filters.text && filters.order) {
      setCurrentPage(0);
      router.replace(router.pathname);
      return products
        .filter((item) => item.title.toLowerCase().indexOf(filters.text) !== -1)
        .sort((a, b) =>
          filters.order === SORT_TYPE.DESC
            ? b.price - a.price
            : a.price - b.price
        );
    }
    if (filters.text) {
      setCurrentPage(0);
      router.replace(router.pathname);
      return products.filter(
        (item) => item.title.toLowerCase().indexOf(filters.text) !== -1
      );
    }
    if (filters.order) {
      setCurrentPage(0);
      router.replace(router.pathname);
      return products.sort((a, b) =>
        filters.order === SORT_TYPE.DESC ? b.price - a.price : a.price - b.price
      );
    }
    return products;
  }, [filters, products, router]);

  const numberOfPages = useMemo(() => {
    return data.length < ITEMS_PER_PAGE
      ? 1
      : Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);

  // grid-row-[200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] OLD VERSION
  // grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] NEW VERSION
  return (
    <div className='grid max-w-6xl mx-auto p-2 md:p-8'>
      <Filters filters={filters} setFilters={setFilters} />
      <div className='grid gap-3 md:gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] mt-8'>
        {data?.length ? (
          data
            ?.slice(+after, +after + ITEMS_PER_PAGE)
            .map((product) => <Item key={product.id} product={product} />)
        ) : (
          <span>No results found.</span>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};
