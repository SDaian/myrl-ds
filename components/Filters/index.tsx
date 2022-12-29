import { ChangeEvent } from 'react';

import { SORT_TYPE } from '@/types/index';
import { debounce } from '@/utils/debounce';
import { SearchIcon } from '@/components/Icons/search-icon';

const sortOptions = [
  {
    value: SORT_TYPE.DESC,
    label: 'Price Descending',
  },
  { value: SORT_TYPE.ASC, label: 'Price Ascending' },
];

type Props = {
  filters: {
    order: string;
    text: string;
  };
  setFilters: (value: { order: string; text: string }) => void;
};

export const Filters = ({ filters, setFilters }: Props) => {
  return (
    <div className='flex gap-4 md:flex-row flex-col items-center md:justify-between'>
      <div className='relative'>
        <input
          className='pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.trim() !== '') {
              setFilters({ ...filters, text: e.target.value });
            } else {
              e.target.value = '';
              setFilters({ ...filters, text: '' });
            }
          }, 500)}
          placeholder='Search products'
          type='string'
        />
        <span className='flex absolute top-[6px] left-[10px]'>
          <SearchIcon />
        </span>
      </div>
      <div>
        <select
          data-testid='select'
          className='select'
          defaultValue={'asc'}
          onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
            setFilters({ ...filters, order: e.target.value });
          }, 100)}
        >
          {sortOptions.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
