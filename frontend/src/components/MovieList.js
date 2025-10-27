import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const MovieList = props => {
  const FavouriteComponent = props.favouriteComponent;
  const isFavourite = props.isFavourite;
  const isFavouritesList = props.isFavouritesList || false;

  if (!props.movies || props.movies.length === 0) {
    return null;
  }

  return (
    <div className="element">
      {props.movies
        .filter(movie => movie && movie.i && movie.i.imageUrl)
        .map((movie, index) => {
          const isInFavourites = isFavouritesList || (isFavourite ? isFavourite(movie) : false);
          
          return (
            <div key={index} className="element-div">
              <img 
                src={movie.i?.imageUrl || 'placeholder.png'} 
                alt={movie.l || 'movie'} 
                className="movie-img" 
              />
              <p className="title">{movie.l}</p>
              {props.handleOpenModal && (
                <button className="details" onClick={() => props.handleOpenModal(movie)}>
                  Details
                </button>
              )}
              <div>
                <p
                  onClick={() => props.handleFavouritesClick(movie)}
                  className={isInFavourites ? "hearth-active" : "hearth"}
                >
                  {isInFavourites ? <AiFillHeart /> : <AiOutlineHeart />}
                </p>
                <div className="overlay ">
                  <FavouriteComponent />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
