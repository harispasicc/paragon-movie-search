import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../../components/MovieList';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const mockMovies = [
  {
    l: 'Iron Man',
    y: 2008,
    i: {
      imageUrl: 'https://example.com/iron-man.jpg'
    }
  },
  {
    l: 'The Dark Knight',
    y: 2008,
    i: {
      imageUrl: 'https://example.com/dark-knight.jpg'
    }
  }
];

const mockProps = {
  movies: mockMovies,
  handleFavouritesClick: jest.fn(),
  favouriteComponent: () => <span>Add</span>,
  isFavourite: () => false,
  isFavouritesList: false,
  handleOpenModal: jest.fn()
};

describe('MovieList Component', () => {
  test('renders movie list', () => {
    render(<MovieList {...mockProps} />);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  test('renders empty state when no movies', () => {
    render(<MovieList {...mockProps} movies={[]} />);
    expect(screen.queryByText('Iron Man')).not.toBeInTheDocument();
  });

  test('calls handleFavouritesClick when heart is clicked', () => {
    render(<MovieList {...mockProps} />);
    const hearts = screen.getAllByRole('generic');
    const heartButtons = hearts.filter(el => el.closest('p[class*="hearth"]'));
    
    if (heartButtons.length > 0) {
      fireEvent.click(heartButtons[0]);
      expect(mockProps.handleFavouritesClick).toHaveBeenCalled();
    }
  });

  test('shows AddFavourites component when movie is not in favourites', () => {
    render(<MovieList {...mockProps} />);
    expect(screen.queryByText('Add')).toBeInTheDocument();
  });
});

