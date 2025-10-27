import React from "react";

function DetailsModal(props) {
  const { movie, onClose } = props;

  if (!movie) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Movie Title: {movie.l}</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={movie.i?.imageUrl || 'placeholder.png'} alt={movie.l} className="movie-img" />
            {movie.y && <p>Year: {movie.y}</p>}
            {movie.rank && <p>Rank: {movie.rank}</p>}
            {movie.q && <p>Type: {movie.q}</p>}
            <p>Title: {movie.l}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
