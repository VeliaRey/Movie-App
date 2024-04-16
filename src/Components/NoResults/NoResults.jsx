import React, { Component } from "react";
import "./NoResults.css";

class NoResults extends Component {
  render() {
    return (
      <div className="results-conteiner">
        <p className="results-message">
          К сожалению, мы не смогли найти такой фильм <br />
          Но у нас есть много других не менее интересных фильмов
        </p>
      </div>
    );
  }
}

export default NoResults;
