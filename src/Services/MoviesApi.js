const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmIyNzBkOGMzMWZjZGY3OGUwYjAxNWIzMjVkOTJmNSIsInN1YiI6IjY1ZmYxMDNiNjA2MjBhMDE3YzJiYTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rqRfJ5XGOkPu8Pjt3R6fUI10p2n2uM8NJFZLhbvASK4",
  },
};

const getingOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

class MoviesApi {
  _apiBase = "https://api.themoviedb.org";
  async getResourse(url, options) {
    const res = await fetch(`${this._apiBase}${url}`, options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllMovies(searchLabel, selectedPage) {
    const res = await this.getResourse(
      `/3/search/movie?query=${searchLabel}&include_adult=false&language=en-US&page=${selectedPage}`,
      getOptions,
    );
    return res;
  }

  async getGuestSession() {
    const res = await this.getResourse(
      "/3/authentication/guest_session/new",
      getOptions,
    );
    return res;
  }

  async addRating(movieId, userId, value) {
    const chooseMethod = value ? "POST" : "DELETE";
    value = JSON.stringify({ value });
    const postOptions = {
      method: chooseMethod,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: value,
    };
    const res = await this.getResourse(
      `/3/movie/${movieId}/rating?api_key=9bb270d8c31fcdf78e0b015b325d92f5&guest_session_id=${userId}`,
      postOptions,
    );
    return res;
  }

  async getRating(userId, selectedPage) {
    const res = await this.getResourse(
      `/3/guest_session/${userId}/rated/movies?api_key=9bb270d8c31fcdf78e0b015b325d92f5&language=en-US&page=${selectedPage}&sort_by=created_at.asc`,
      getingOptions,
    );
    return res;
  }

  async getGenres() {
    const res = await this.getResourse(
      "/3/genre/movie/list?language=en",
      getOptions,
    );

    return res;
  }
}

export default MoviesApi;
