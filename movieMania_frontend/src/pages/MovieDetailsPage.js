import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTrendingMovies, getMovieById } from "../store/store";

const MovieDetailsPage = () => {
//   const dispatch = useDispatch();
//   const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);
  // const movies = useSelector((state) => state.movieMania.trendingMovies);

  const [currentMovieDetail, setMovie] = useState();
  const {id} = useParams();

  console.log(id);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c99dd751885a96f93d014f6781add330`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(currentMovieDetail);

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchTrendingMovies({ type: "trending" }));
//     }
//   }, [genresLoaded]);

//   console.log(id);
//   // console.log(movie);

//   useEffect(() => {
//     dispatch(getMovieById({ movieId: id }));
//   });

  return (
    <div className="container">
      <div className="movie_backdrop">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail?currentMovieDetail.backdrop_path:''}`}
          alt="movie-backdrop"
        />
      </div>
      <div className="movieDetails_body row">
        <div className="movie_poster col-4">
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovieDetail?currentMovieDetail.poster:''}`}
            alt="movie-poster"
          />
        </div>
        <div className="movieDetails_column col-8">
          <div className="movie_details">
            <h2 className="movie_title">{currentMovieDetail?currentMovieDetail.name:''}</h2>
            <div className="movie_rating">
              <h4>{currentMovieDetail?currentMovieDetail.rating:''}</h4>
            </div>
            <div className="movieGenre_tags row d-flex"></div>
          </div>
          <div className="movie_description">
            <p className=""></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
