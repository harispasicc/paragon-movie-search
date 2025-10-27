import React from "react";

const SearchBar = props => {
  return (
    <form onSubmit={props.submitHandler} className="col col-sm-4">
      <div className="search-wrapper">
        <input
          className="form-control"
          value={props.searchValue}
          onChange={event => props.setSearchValue(event.target.value)}
          placeholder="Type to search..."
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
