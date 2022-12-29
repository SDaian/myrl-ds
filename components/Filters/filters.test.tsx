import { render, fireEvent, waitFor } from '@testing-library/react';
import { Filters } from './';

jest.mock('@/utils/debounce', () => ({
  debounce: (func: (...args: any[]) => void) => (...args: any[]) => func(...args),
}));

describe('Filters', () => {
  const filters = {
    order: 'asc',
    text: '',
  };

  const setFilters = jest.fn();

  it('renders the filters correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Filters filters={filters} setFilters={setFilters} />
    );

    const input = getByPlaceholderText('Search products');
    const select = getByTestId('select');

    expect(input).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  it('sets the filters correctly when input is changed', async () => {
    const { getByPlaceholderText } = render(
      <Filters filters={filters} setFilters={setFilters} />
    );

    const input = getByPlaceholderText('Search products');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(setFilters).toHaveBeenCalledWith({
        order: 'asc',
        text: 'test',
      });
    });
  });
});
