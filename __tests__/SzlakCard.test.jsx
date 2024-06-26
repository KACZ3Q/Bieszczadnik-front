import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SzlakCard from '@/app/_components/Card'; 

const mockSzlak = {
  id: 1,
  attributes: {
    tytul: 'Połonina Caryńska',
    slug: 'polonina-carynska',
  },
};

describe('SzlakCard', () => {
  it('renders the trail title', () => {
    render(<SzlakCard szlak={mockSzlak} />);

    const title = screen.getByText('Połonina Caryńska');
    const link = screen.getByRole('link', { name: /Czytaj więcej/i });

    expect(title).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/szlaki/polonina-carynska');
  });
});
