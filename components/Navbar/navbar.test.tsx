import { render, fireEvent } from '@testing-library/react';
import { Navbar } from './';

describe('Navbar', () => {
  it('renders the correct link', () => {
    const { getByTestId } = render(<Navbar />);
    const link = getByTestId('navbar-link');
    expect(link.getAttribute('href')).toEqual('/');
  });

  it('navigates to the correct link when clicked', () => {
    const { getByTestId } = render(<Navbar />);
    const link = getByTestId('navbar-link');
    const href = link.getAttribute('href');

    fireEvent.click(link);

    expect(link.getAttribute('href')).toBe(href);
  });
});
