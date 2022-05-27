import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';

import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Router from './config/Router';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Router />
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
