import { getMovies } from '../api/movie'

export function fetchMoive() {
    return function (dispatch) {
      dispatch({ type: "FETCHING_MOVIE" })
  
      getMovies()
        .then(movie => {
          dispatch({ type: "SET_MOVIES", payload: movie })
        })
        .catch(err => {
          dispatch({ type: "FETCHING_MOVIE_ERROR" })
          console.error("MOVIE fetch error", err)
        })
    }
  }