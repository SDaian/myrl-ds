import { render } from '@testing-library/react';
import { SearchIcon } from './search-icon';

describe('SearchIcon', () => {
  it('renders the search icon correctly', () => {
    const { getByTestId } = render(<SearchIcon />);
    const icon = getByTestId('search-icon');

    expect(icon).toBeInTheDocument();
  });
});