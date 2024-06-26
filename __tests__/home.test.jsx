import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; 

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { name: /BIESZCZADY/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the background image', () => {
    render(<Home />);

    const backgroundImage = screen.getByAltText('Bieszczady Background');
    expect(backgroundImage).toBeInTheDocument();
  });

  it('renders the quote', () => {
    render(<Home />);

    const quote = screen.getByText(/W Bieszczadach nikogo nie interesuje, kim jesteś i skąd pochodzisz/i);
    expect(quote).toBeInTheDocument();
  });
});
