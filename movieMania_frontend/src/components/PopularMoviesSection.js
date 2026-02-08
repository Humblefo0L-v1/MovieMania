import React, { useEffect } from "react";
import CardTemplate from './CardTemplate';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../store/store";

const PopularMoviesSection = () => {

  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movieMania.popularMovies);
  const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);

  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchPopularMovies({type: "popular"}));
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
      <div className='text-white text-start mx-3 mt-5'>
        <h3>Popular Now</h3>
      </div>
      <Slider {...settings}>
        {popularMovies.map((movie) => (
          <CardTemplate movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default PopularMoviesSection;
