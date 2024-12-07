import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

test('renders recipe list', () => {
  render(<RecipeList />);
  const linkElement = screen.getByText(/Recipe Name/i);
  expect(linkElement).toBeInTheDocument();
});
