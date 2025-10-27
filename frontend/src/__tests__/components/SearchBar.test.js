import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

const mockProps = {
  searchValue: '',
  setSearchValue: jest.fn(),
  submitHandler: jest.fn()
};

describe('SearchBar Component', () => {
  test('renders search input', () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByPlaceholderText(/Type to search/i);
    expect(input).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(<SearchBar {...mockProps} />);
    const button = screen.getByText(/Submit/i);
    expect(button).toBeInTheDocument();
  });

  test('calls setSearchValue on input change', () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByPlaceholderText(/Type to search/i);
    
    fireEvent.change(input, { target: { value: 'iron man' } });
    expect(mockProps.setSearchValue).toHaveBeenCalledWith('iron man');
  });

  test('calls submitHandler on submit', () => {
    render(<SearchBar {...mockProps} />);
    const form = screen.getByRole('form');
    
    fireEvent.submit(form);
    expect(mockProps.submitHandler).toHaveBeenCalled();
  });

  test('displays correct value', () => {
    render(<SearchBar {...mockProps} searchValue="batman" />);
    const input = screen.getByPlaceholderText(/Type to search/i);
    expect(input.value).toBe('batman');
  });
});

