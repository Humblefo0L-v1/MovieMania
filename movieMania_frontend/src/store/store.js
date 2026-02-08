import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  const initialState = {
    movies: [],
    movieObj: [],
    trendingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    genresLoaded: false,
    genres: [],
  };
  
  export const getMovieGenres = createAsyncThunk("movieMania/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    return genres;
  });
  
  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          desc: movie?movie.overview:"",
          rating: movie?movie.vote_average:"Unrated",
          image: movie.backdrop_path,
          poster: movie.poster_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres) => {
    const moviesArray = [];
    
      const {
        data: { results },
      } = await axios.get(`${api}`);
      createArrayFromRawData(results, moviesArray, genres);
    
    return moviesArray;
    // console.log(moviesArray);
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "movieMania/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        movieMania: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genre}`,
        genres
      );
    }
  );
  
  export const fetchTrendingMovies = createAsyncThunk(
    "movieMania/trending",
    async ({ type }, thunkAPI) => {
      const {
        movieMania: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        genres
      );
    }
  );

  export const fetchPopularMovies = createAsyncThunk(
    "movieMania/popular",
    async ({ type }, thunkAPI) => {
      const {
        movieMania: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        genres
      );
    }
  );

  export const fetchTopRatedMovies = createAsyncThunk(
    "movieMania/topRated",
    async ({ type }, thunkAPI) => {
      const {
        movieMania: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/movie/${type?type:'top_rated'}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        genres
      );
    }
  );

  export const getMovieById = createAsyncThunk(
    "movieMania/getMovieById",
    async({ movieId }, thunkAPI) => {
      const{
        movieMania: { genres },
      } = thunkAPI.getState();

      return getRawData(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`, genres);
    }
  );
  
  export const getUsersLikedMovies = createAsyncThunk(
    "movieMania/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "movieMania/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const appSlice = createSlice({
    name: "movieMania",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getMovieGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(getMovieById.fulfilled, (state, action) => {
        state.movieObj = action.payload;
      })
      builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trendingMovies = action.payload;
      });
      builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      });
      builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload;
      });
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      movieMania: appSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies } = appSlice.actions;