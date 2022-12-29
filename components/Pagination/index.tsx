import { useRouter } from 'next/router';

export type Props = {
  currentPage: number;
  numberOfPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
};

export const Pagination = ({
  currentPage,
  numberOfPages,
  setCurrentPage,
  itemsPerPage,
}: Props) => {
  const router = useRouter();

  const handleSubmit = (page: number) => {
    setCurrentPage(page);
    router.push(`?after=${page * itemsPerPage}`);
  };

  return (
    <>
      {numberOfPages > 1 && (
        <nav className='flex items-center gap-2 justify-end mt-4' aria-label='Pagination'>
          {Array.from({ length: numberOfPages }, (e, i) => i).map((num, i) => (
            <div
              onClick={() => handleSubmit(num)}
              key={i}
              className={`${
                currentPage === num && 'bg-[#01b4e4] text-white'
              } border rounded-lg border-[#01b4e4] cursor-pointer px-4 py-2 hover:text-white hover:bg-[#01b4e4]`}
            >
              {num + 1}
            </div>
          ))}
        </nav>
      )}
    </>
  );
};
