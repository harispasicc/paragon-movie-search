import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBar from "./components/SearchBar";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import DetailsModal from "./components/DetailsModal";
import Loader from "./components/Loader";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMovieRequest = useCallback((query) => {
    if (!query) return;
    
    setLoading(true);
    
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${query}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fe6371cedbmsh2f2942099f0e8ccp1e146fjsnac31a71440c8",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMovies(data.d || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setMovies([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (submitValue) {
      getMovieRequest(submitValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValue]);

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      getMovieRequest(searchValue);
    } else {
      setMovies([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = items => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = movie => {
    const isAlreadyFavourite = favourites.some(fav => 
      (fav.id && fav.id === movie.id) || 
      (fav.l === movie.l && fav.y === movie.y)
    );
    
    if (isAlreadyFavourite) {
      return;
    }
    
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = movie => {
    const newFavouriteList = favourites.filter(favourite => 
      !((favourite.id && favourite.id === movie.id) || 
        (favourite.l === movie.l && favourite.y === movie.y))
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const submitHandler = e => {
    e.preventDefault();
    setSubmitValue(searchValue);
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = movie => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const isFavourite = movie => {
    if (!movie || !favourites.length) return false;
    return favourites.some(fav => 
      (fav.id && fav.id === movie.id) || 
      (fav.l === movie.l && fav.y === movie.y)
    );
  };

  const handleFavouriteToggle = movie => {
    if (isFavourite(movie)) {
      removeFavouriteMovie(movie);
    } else {
      addFavouriteMovie(movie);
    }
  };

  const handleResetSearch = () => {
    setSearchValue("");
    setSubmitValue("");
    setMovies([]);
    setLoading(false);
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="modal-container">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Paragon Movie Search" onClick={handleResetSearch} />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submitHandler={submitHandler}
        />
      </div>
      {showModal && <DetailsModal movie={selectedMovie} onClose={handleCloseModal} />}

      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <MovieList
            movies={movies}
            handleFavouritesClick={handleFavouriteToggle}
            favouriteComponent={AddFavourites}
            handleOpenModal={handleOpenModal}
            isFavourite={isFavourite}
          />
        )}
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
          isFavourite={isFavourite}
          isFavouritesList={true}
          handleOpenModal={handleOpenModal}
        />
      </div>
    </div>
  );
};

export default App;
