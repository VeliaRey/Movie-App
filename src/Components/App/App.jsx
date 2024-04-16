import { debounce } from "lodash";
import React, { Component } from "react";

import Search from "../Search/Search";
import Movies from "../Movies/Movies";
import MoviesApi from "../MoviesApi/MoviesApi";
import Pagi from "../Pagination/Pagination";
import MenuTabs from "../Tabs/Tabs";
import { GenresProvider } from "../../Services/apiService-context";

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
    localStorage.clear();
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
      selectedPage: 1,
    });
  };

  rateMovie = (movieId, value) => {
    const { guestSessionId } = this.state;
    this.moviesApi.addRating(movieId, guestSessionId, value);

    localStorage.setItem(movieId, JSON.stringify(value));
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
        <Pagi
          allPages={allPages}
          onSelectedPage={this.onSelectedPages}
          selectedPage={selectedPage}
        />
      </>
    );
  }
}

export default App;
