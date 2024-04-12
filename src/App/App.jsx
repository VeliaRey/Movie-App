import React, { Component } from "react";
import { debounce } from "lodash";

import Search from "../Search/Search";
import Movies from "../Movies/Movies";
import MenuTabs from "../Tabs/Tabs";
import Pagi from "../Pagination/Pagination";
import MoviesApi from "../MoviesApi/MoviesApi";
import { GenresProvider } from "../apiService-context/apiService-context";

class App extends Component {
  debounceUpdateSearchValue = debounce((value) => {
    this.setState({
      searchLabel: value,
    });
  }, 1000);

  moviesApi = new MoviesApi();

  constructor() {
    super();
    this.state = {
      searchLabel: "",
      selectedPage: 1,
      allPages: null,
      guestSessionId: null,
      tabRated: false,
      genres: [],
    };
  }

  onLabelChange = (event) => {
    this.debounceUpdateSearchValue(event.target.value);
  };

  countPages = (res) => {
    this.setState({
      allPages: res.total_pages,
    });
  };

  onSelectedPages = (number) => {
    this.setState({
      selectedPage: number,
    });
  };

  async componentDidMount() {
    this.moviesApi.getGenres().then((res) => {
      this.setState({
        genres: res,
      });
    });

    this.moviesApi.getGuestSession().then((res) => {
      this.setState({
        guestSessionId: res.guest_session_id,
      });
    });
  }

  onTabsSwitch = (flag) => {
    this.setState({
      tabRated: flag,
    });
  };

  rateMovie = (movieId, value) => {
    const { guestSessionId } = this.state;
    this.moviesApi.addRating(movieId, guestSessionId, value);
  };

  render() {
    const {
      searchLabel,
      allPages,
      selectedPage,
      tabRated,
      guestSessionId,
      genres,
    } = this.state;

    return (
      <>
        <MenuTabs onTabsSwitch={this.onTabsSwitch} />
        <GenresProvider value={genres}>
          {!tabRated && (
            <Search
              searchLabel={searchLabel}
              onLabelChange={this.onLabelChange}
            />
          )}
          <Movies
            searchLabel={searchLabel}
            selectedPage={selectedPage}
            countPages={this.countPages}
            rateMovie={this.rateMovie}
            tabRated={tabRated}
            guestSessionId={guestSessionId}
          />
        </GenresProvider>
        <Pagi allPages={allPages} onSelectedPage={this.onSelectedPages} />
      </>
    );
  }
}

export default App;
