import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies } from '../store/store';
import CardTemplate from './CardTemplate';

const TrendingMoviesSection = () => {

  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movieMania.trendingMovies);
  const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);

  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchTrendingMovies({type: "top_rated"}));
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

  return(
    <>
      <div className='container'>
      <div className='text-white text-start mx-3 mt-2'>
        <h3>Top Rated</h3>
      </div>
      <Slider {...settings}>
        {
          trendingMovies.map((movie) => (
            <CardTemplate movie={movie} />
          ))
        }
      </Slider>
      </div>
    </>
  );
};

export default TrendingMoviesSection;