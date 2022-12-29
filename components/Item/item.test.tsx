import { render, fireEvent } from '@testing-library/react';
import { formatPrice } from '@/utils/format-price';
import { Item } from './';

jest.mock('next/link', () => {
  return ({ children }: any) => {
    return children;
  };
});

describe('Item', () => {
  const product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    hasDiscount: false,
    image: '/images/body.jpg',
  };

  it('renders the correct product information', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <Item product={product} />
    );

    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByTestId('normal-price').textContent).toBe(
      `${formatPrice(product.price)}`
    );
    expect(getByAltText('product image')).toBeInTheDocument();
  });

  it('renders the correct discounted price if applicable', () => {
    const discountedProduct = {
      ...product,
      hasDiscount: true,
      priceAfterDiscount: 5,
    };
    const { getByText, getByTestId } = render(
      <Item product={discountedProduct} />
    );

    expect(getByTestId('discounted-price').textContent).toBe(
      `${formatPrice(discountedProduct.priceAfterDiscount)}`
    );
  });

  it('navigates to the correct link when clicked', () => {
    const { getByText } = render(<Item product={product} />);
    const link = getByText(product.title);
    const href = link.getAttribute('href');

    fireEvent.click(link);

    expect(link.getAttribute('href')).toBe(href);
  });
});
