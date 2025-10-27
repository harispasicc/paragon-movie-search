import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Paragon Movie Search title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Paragon Movie Search/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search input field', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Type to search/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(<App />);
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
  });

  test('renders Favourites section', () => {
    render(<App />);
    const favouritesTitle = screen.getByText(/Favourites/i);
    expect(favouritesTitle).toBeInTheDocument();
  });

  test('allows typing in search input', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Type to search/i);
    fireEvent.change(searchInput, { target: { value: 'iron man' } });
    expect(searchInput.value).toBe('iron man');
  });

  test('clicking title resets search', () => {
    render(<App />);
    const titleElement = screen.getByText(/Paragon Movie Search/i);
    const searchInput = screen.getByPlaceholderText(/Type to search/i);
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
    
    fireEvent.click(titleElement);
    expect(searchInput.value).toBe('');
  });
});

