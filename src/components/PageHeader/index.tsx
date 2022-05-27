import React from 'react';

import './PageHeader.scss';
import bg from '../../assets/footer-bg.jpg';

interface PageHeaderProps {
  children: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};
