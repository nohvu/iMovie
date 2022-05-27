import React from 'react';

import './movieList.scss';
import { SwiperSlide, Swiper } from 'swiper/react';

import { MovieCard } from '../MovieCard';

import { tmdbApi, categories } from '../../api/tmdbApi';

interface MovieProps {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  name: string;
}

interface MovieListProps {
  id?: number;
  categories?: string;
  type?: string;
  item?: MovieProps;
}

export const MovieList: React.FC<MovieListProps> = (props) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (props.type !== 'similar') {
        switch (props.categories) {
          case categories.movie:
            response = await tmdbApi.getMovieList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.categories, props.id, { params });
      }
      setItems(response.results);
    };
    getList();
  }, [props.categories, props.id, props.type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((el, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={el} categories={props.categories} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
