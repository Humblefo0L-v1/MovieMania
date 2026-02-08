import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PopularMoviesSection from '../components/PopularMoviesSection';
import TrendingMoviesSection from '../components/TrendingMoviesSection';
import TopRatedMovies from '../components/TopRatedMovies';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies, getMovieGenres } from '../store/store';
import Footer from '../components/Footer';

const Homepage = () => {

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movieMania.genres);
  const genresLoaded = useSelector((state) => state.movieMania.genresLoaded);

  useEffect(() => {
    dispatch(getMovieGenres());
  }, []);

  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchTrendingMovies({ type: "trending" }));
    }
  }, [genresLoaded]);

  return (
    <div className='main-wrapper'>
      <Header />
      <HeroSection />
      <div className='main-section pt-5'>
        <PopularMoviesSection />
        <TrendingMoviesSection />
        <TopRatedMovies />
      </div>
      <Footer />
    </div>
  )
}

export default Homepage