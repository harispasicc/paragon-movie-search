import React from "react";

const MovieListHeading = props => {
  return (
    <div className="col">
      <h1 
        onClick={props.onClick}
        style={{ 
          cursor: props.onClick ? 'pointer' : 'default',
          userSelect: 'none'
        }}
      >
        {props.heading}
      </h1>
    </div>
  );
};

export default MovieListHeading;
