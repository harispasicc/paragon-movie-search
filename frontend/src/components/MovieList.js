import React from "react";
import { AiFillHeart } from "react-icons/ai";

const MovieList = props => {
  const handleClick = movie => {
    props.handleFavouritesClick(movie);
  };

  const FavouriteComponent = props.favouriteComponent;

  return (
    <div className="element">
      {props.movies.map((movie, index) => (
        <div key={index} className="element-div">
          <img src={movie.i.imageUrl} alt="movie" className="movie-img" />
          <p className="title">{movie.l}</p>
          <button className="details" onClick={() => props.handleOpenModal()}>
            Details
          </button>
          <div>
            <p
              onClick={() => props.handleFavouritesClick(movie)}
              className="hearth-active"
            >
              <AiFillHeart />
            </p>
            <div className="overlay ">
              <FavouriteComponent />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
