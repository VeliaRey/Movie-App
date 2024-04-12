import React, { Component } from "react";

import "./Movies.css";
import MoviesPosters from "../MoviesPosters/MoviesPosters";

class Movies extends Component {
  render() {
    const {
      searchLabel,
      selectedPage,
      countPages,
      rateMovie,
      tabRated,
      guestSessionId,
    } = this.props;
    return (
      <MoviesPosters
        searchLabel={searchLabel}
        selectedPage={selectedPage}
        countPages={countPages}
        rateMovie={rateMovie}
        tabRated={tabRated}
        guestSessionId={guestSessionId}
      />
    );
  }
}

export default Movies;
