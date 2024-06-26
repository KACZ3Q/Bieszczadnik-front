import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from '@/app/_components/Content'; 

const mockZawartosc = [
  {
    type: 'heading',
    children: [{ text: 'Testowy Nagłówek' }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'Testowy Paragraf' }]
  }
];

describe('Content', () => {
  it('renders headings and paragraphs based on provided zawartosc', () => {
    render(<Content zawartosc={mockZawartosc} />);

    const heading = screen.getByText('Testowy Nagłówek');
    const paragraph = screen.getByText('Testowy Paragraf');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });
});
