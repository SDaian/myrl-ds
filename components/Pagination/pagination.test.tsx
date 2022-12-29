import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Pagination } from './';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const ITEMS_PER_PAGE = 8;

describe('Pagination', () => {
  it('renders the correct number of pages', () => {
    const numberOfPages = 5;
    const { getAllByText } = render(
      <Pagination
        currentPage={0}
        numberOfPages={numberOfPages}
        setCurrentPage={jest.fn()}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    );

    expect(getAllByText(/[1-5]/)).toHaveLength(numberOfPages);
  });

  it('sets the current page and calls router.push when a page is clicked', () => {
    const setCurrentPage = jest.fn();
    const router = useRouter();
    const { getAllByText } = render(
      <Pagination
        currentPage={0}
        numberOfPages={5}
        setCurrentPage={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    );
    const pageButtons = getAllByText(/[1-5]/);
    const secondPageButton = pageButtons[1];

    fireEvent.click(secondPageButton);

    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(router.push).toHaveBeenCalledWith(`?after=${ITEMS_PER_PAGE}`);
  });
});