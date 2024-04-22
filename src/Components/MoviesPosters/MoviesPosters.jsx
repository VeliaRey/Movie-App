import React, { Component } from "react";
import MoviesApi from "../../Services/MoviesApi";
import "./MoviesPosters.css";

import { Rate, Tag } from "antd";
import { format } from "date-fns";
import { Offline } from "react-detect-offline";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import limitText from "../../utils/LimitText";
import NoResults from "../NoResults/NoResults";
import OfflineMessage from "../OfflineMessage/OfflineMessage";
import Spinner from "../Spinner/Spinner";
import { GenresConsumer } from "../../Services/apiService-context";
import Pablo from "./Pablo.jpg";

class MoviesPosters extends Component {
  moviesApi = new MoviesApi();

  constructor() {
    super();
    this.state = {
      movieData: [],
      isLoaded: false,
      error: false,
    };
  }

  onError = (err) => {
    this.setState({
      error: true,
      isLoaded: false,
    });
  };

  componentDidMount() {
    this.newRequest();
  }

  componentDidUpdate(prevProps) {
    const { searchLabel, selectedPage, tabRated } = this.props;

    if (tabRated !== prevProps.tabRated) {
      this.newRequest();
    }
    if (searchLabel !== prevProps.searchLabel) {
      this.newRequest();
    }
    if (selectedPage !== prevProps.selectedPage) {
      this.setState({
        isLoaded: false,
      });
      this.newRequest();
    }
  }

  newRequest() {
    const { searchLabel, selectedPage, tabRated, guestSessionId } = this.props;

    this.setState({
      isLoaded: false,
      error: false,
    });

    if (!tabRated) {
      if (searchLabel.trim() !== "") {
        this.moviesApi
          .getAllMovies(searchLabel, selectedPage)
          .then((res) => this.updateMovies(res))
          .catch((err) => this.onError(err));
      }
    } else {
      this.moviesApi
        .getRating(guestSessionId, selectedPage)
        .then((res) => this.updateMovies(res))
        .catch((err) => this.onError(err));
    }
  }

  updateMovies(res) {
    const { countPages } = this.props;
    this.setState({
      movieData: res.results,
      isLoaded: true,
    });
    countPages(res);
  }

  switchColors(voteAverage) {
    let classColor = "rating-green";
    if (voteAverage <= 3) classColor = "rating-red";
    if (voteAverage > 3 && voteAverage <= 5) classColor = "rating-yellow";
    if (voteAverage > 5 && voteAverage <= 7) classColor = "rating-orange";
    return `posters-rating ${classColor}`;
  }

  render() {
    const { movieData, isLoaded, error } = this.state;
    const { rateMovie, searchLabel } = this.props;

    const hasData = !(isLoaded || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner =
      !isLoaded && !error && searchLabel.trim().length !== 0 ? (
        <Spinner />
      ) : null;
    const content =
      isLoaded && !error ? (
        <MoviesShow
          movieData={movieData}
          rateMovie={rateMovie}
          switchColors={this.switchColors}
        />
      ) : null;

    const noResults = movieData.length === 0 && !hasData ? <NoResults /> : null;

    return (
      <>
        <Offline>
          <OfflineMessage />
        </Offline>
        {noResults}
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}

function MoviesShow({ movieData, rateMovie, switchColors }) {
  return (
    <GenresConsumer>
      {(genres) => (
        <div className="movies-posters">
          {movieData?.map((film) => (
            <div className="posters" key={film.id}>
              <img
                className="posters-image"
                src={
                  film.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${film.backdrop_path}`
                    : Pablo
                }
                alt="картинка"
              />

              <div className="posters-info">
                <h5 className="posters-title">{film.title}</h5>
                <div className={switchColors(film.vote_average)}>
                  {film.vote_average.toFixed(1)}
                </div>
                <p className="posters-data">
                  {format(new Date(film.release_date || null), "MMMM d, y")}
                </p>
                <div className="posters-genre">
                  {genres.genres.map(
                    (gen) =>
                      film.genre_ids.includes(gen.id) && (
                        <Tag key={gen.name}> {gen.name}</Tag>
                      ),
                  )}
                </div>
                <p className="posters-text">{limitText(film.overview, 100)}</p>
                <Rate
                  count={10}
                  onChange={(value) => rateMovie(film.id, value)}
                  defaultValue={localStorage.getItem(film.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </GenresConsumer>
  );
}

export default MoviesPosters;
