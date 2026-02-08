import React, {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { fetchTrendingMovies } from "../store/store";
import { BsStarFill as RatingStarIcon } from "react-icons/bs";

const HeroSection = () => {

  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);
  const movies = useSelector((state) => state.movieMania.trendingMovies);

  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchTrendingMovies({type: "trending"}));
    }
  }, [genresLoaded])

  const carouselSettings = {
    showThumbs: false,
    autoPlay: true,
    transitionTime: 800,
    infiniteLoop: true,
    showStatus: false,
    showIndicators: false,
  };
  console.log(movies);

  return (
    <>
      <div className="poster">
        <Carousel {...carouselSettings}>
          {movies.map((movie) => (
            <>
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.image}`}
                  alt="posterImg"
                />
              </div>
              <div className="posterImage__overlay text-white d-flex">
                <div className="posterImage__title text-start">
                  {movie.name}
                </div>
                <div className="posterImage__runtime col-4 text-start p-2">
                  <span className="posterImage__rating mx-2" style={{fontSize: 24}}>
                    {movie.rating.toFixed(1)}
                  </span>
                  <RatingStarIcon className="mb-2" color="#ffdf00" fontSize={24}/>
                </div>
                <div className="posterImage__description col-6">
                  {movie.desc}
                </div>
              </div>
            </>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HeroSection;
