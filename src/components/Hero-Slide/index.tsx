import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero-slide.scss';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { tmdbApi, categories, movieType } from '../../api/tmdbApi';
import { apiConfig } from '../../api/apiConfig';

import { Button, OutlineButton } from '../Button';
import { Modal, ModalContent } from '../Modal/';

export const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = React.useState([]);

  React.useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}>
        {movieItems.map((el, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem item={el} className={`${isActive ? 'active' : ''}`} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((el, index) => (
        <TrailerModal key={index} item={el} />
      ))}
    </div>
  );
};

interface MovieProps {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
}
interface HeroSlideItemProps {
  item: MovieProps;
  className: string;
}

const HeroSlideItem: React.FC<HeroSlideItemProps> = (props) => {
  let history = useNavigate();
  const item = props.item;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path,
  );
  const setModalActive = async () => {
    const modal = document.querySelector<any>(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(categories.movie, item.id);
    if (videos.results.length > 0) {
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No Trailer';
    }
    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}>
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history('/movie/' + item.id)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

interface TrailerModalProps {
  key: number;
  item: MovieProps;
}

const TrailerModal: React.FC<TrailerModalProps> = (props) => {
  const item = props.item;
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const onClose = () => iframeRef.current?.setAttribute('src', '');
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};
