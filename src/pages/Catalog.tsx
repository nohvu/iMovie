import React from 'react';

import { useParams } from 'react-router-dom';
import { categories } from '../api/tmdbApi';
import { MovieGrid } from '../components/MovieGrid';
import { PageHeader } from '../components/PageHeader';

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>{categories.movie === category ? 'Movies' : 'TV Series'}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid categories={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
