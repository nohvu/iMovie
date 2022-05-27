import { Link } from 'react-router-dom';
import { HeroSlide } from '../components/Hero-Slide';

import { OutlineButton } from '../components/Button';
import { MovieList } from '../components/MovieList';
import { categories, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList categories={categories.movie} type={movieType.popular}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList categories={categories.movie} type={movieType.top_rated}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Series</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList categories={categories.tv} type={tvType.popular}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Series</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList categories={categories.tv} type={tvType.top_rated}></MovieList>
        </div>
      </div>
    </>
  );
};

export default Home;
