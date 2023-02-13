import React from "react";

function DetailsModal(props) {
  return (
    <div>
      <div className="modal">
        <div className="modal-dialog">
          {props.movies.map((movie, index) => (
            <div className="modal-content" key={index}>
              <div className="modal-header">
                <h5 className="modal-title">Movie Ttitle: {movie.l}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={movie.i.imageUrl} alt="movie" className="movie-img" />
                <p>Year: {movie.y}</p>
                <p>Rank: {movie.rank}</p>
                <p>Type: {movie.q}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
