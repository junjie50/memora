const React = require('react');
const { render, screen } = require('@testing-library/react');
const LogInPage = require('../src/LogInPage'); // Adjust the import based on your actual file structure

test('renders login form', () => {
  render(<LogInPage />);
  const loginForm = screen.getByRole('form');
  expect(loginForm).toBeInTheDocument();
});
