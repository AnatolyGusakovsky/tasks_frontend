import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tasks app', () => {
  render(<App />);
  const linkElement = screen.getByTestId('TasksApp')
  expect(linkElement).toBeInTheDocument();
});
