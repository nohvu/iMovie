//@ts-nocheck
import { axiosClient } from './axiosClient';

export const categories = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

export const tmdbApi: tmdbApiProps = {
  getMovieList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (category, id) => {
    const url = categories[category] + `/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },
  search: (category, params) => {
    const url = 'search/' + categories[category];
    return axiosClient.get(url, params);
  },
  details: (category, id, params) => {
    const url = categories[category] + `/${id}`;
    return axiosClient.get(url, params);
  },
  credits: (category, id) => {
    const url = categories[category] + `/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },
  similar: (category, id) => {
    const url = categories[category] + `/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },
};
