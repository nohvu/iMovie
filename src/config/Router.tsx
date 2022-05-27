import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Details from '../pages/details/Details';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Details />} />
    </Routes>
  );
};

export default Router;
