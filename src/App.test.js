import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});