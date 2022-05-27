import React from 'react';

import './MovieCard.scss';

import { categories } from '../../api/tmdbApi';
import { apiConfig } from '../../api/apiConfig';

import { Button } from '../Button';
import { Link } from 'react-router-dom';

interface MovieProps {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  name: string;
}

interface MovieCardProps {
  categories: any;
  item: MovieProps;
}

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const item = props.item;
  //@ts-ignore
  const link = '/' + categories[props.categories] + '/' + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};
