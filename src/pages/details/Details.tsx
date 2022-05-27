import React from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../../api/apiConfig';
import { tmdbApi } from '../../api/tmdbApi';
import { MovieList } from '../../components/MovieList';
import { CastList } from './CastList';

import './details.scss';
import { VideoList } from './VideoList';

interface GenreProps {
  name: string;
}

interface ItemProps {
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  genres: GenreProps[];
  id: number;
}

export const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = React.useState<ItemProps | null>(null);

  React.useEffect(() => {
    const getDetails = async () => {
      const response = await tmdbApi.details(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetails();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path,
              )})`,
            }}></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path,
                  )})`,
                }}></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span className="genres__item" key={index}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList categories={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
