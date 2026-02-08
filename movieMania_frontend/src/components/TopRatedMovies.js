import React, { useEffect } from "react";
import CardTemplate from './CardTemplate';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingMovies } from "../store/store";

const TopRatedMovies = () => {

  const dispatch = useDispatch();
  const topRatedMovies = useSelector((state) => state.movieMania.trendingMovies);
  const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);

  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchTrendingMovies({type: "trending"}));
    }
  }, [genresLoaded]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className='text-white text-start mx-3 mt-2'>
        <h3>Currently Trending</h3>
      </div>
      <Slider {...settings}>
        {topRatedMovies.map((movie) => (
          <CardTemplate movie={movie} />
        ))}
      </Slider>
    </div>
  )
}

export default TopRatedMovies