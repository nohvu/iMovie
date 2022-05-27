import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './header.scss';
import logo from '../../assets/tmovie.png';

const headerNav = [
  { display: 'Home', path: '/' },
  { display: 'Movie', path: '/movie' },
  { display: 'Series', path: '/tv' },
];

export const Header = () => {
  const { pathname } = useLocation();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const active = headerNav.findIndex((el) => el.path === pathname);

  React.useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current?.classList.add('shrink');
      } else {
        headerRef.current?.classList.remove('shrink');
      }
      window.addEventListener('scroll', shrinkHeader);
      return () => {
        window.removeEventListener('scroll', shrinkHeader);
      };
    };
  }, []);
  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to="/">iMovies</Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((el, index) => (
            <li key={index} className={`${index === active ? 'active' : ''}`}>
              <Link to={el.path}>{el.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
