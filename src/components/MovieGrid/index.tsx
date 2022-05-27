//@ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './MovieGrid.scss';
import { MovieCard } from '../MovieCard';
import { useParams } from 'react-router-dom';
import { tmdbApi, categories, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton } from '../Button';
import { Input } from '../Input';
import { Button } from '../Button';

export const MovieGrid = (props) => {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const { keyword } = useParams();

  const loadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = { page: page + 1 };
      switch (props.categories) {
        case categories.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = { page: page + 1, query: keyword };
      response = await tmdbApi.search(props.categories, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };
  React.useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        console.log(props.categories);
        switch (props.categories) {
          case categories.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(props.categories, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.categories, keyword]);

  return (
    <>
      <div className="section mb-3">
        <MovieSearch categories={props.categories} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((el, index) => (
          <MovieCard key={index} categories={props.categories} item={el} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <div className="small" onClick={loadmore}>
            <OutlineButton>Load more</OutlineButton>
          </div>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useNavigate();
  const [keyword, setKeyword] = React.useState(props.keyword ? props.keyword : '');

  const goToSearch = React.useCallback(() => {
    if (keyword.trim().length > 0) {
      history(`/${categories[props.categories]}/search/${keyword}`);
    }
  }, [keyword, props.categories, history]);

  React.useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={goToSearch} className="small">
        Search
      </Button>
    </div>
  );
};
