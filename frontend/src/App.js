import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBar from "./components/SearchBar";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import DetailsModal from "./components/DetailsModal";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getMovieRequest = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${searchValue}`, {
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
        setMovies(data.d);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  useEffect(() => {
    getMovieRequest();
  }, [submitValue]);

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
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = movie => {
    const newFavouriteList = favourites.filter(
      favourite => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const submitHandler = e => {
    e.preventDefault();
    setSubmitValue(searchValue);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="modal-container">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Paragon Movie Search" />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submitHandler={submitHandler}
        />
      </div>
      {showModal && <DetailsModal movies={movies} />}

      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
