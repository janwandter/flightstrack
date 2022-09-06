import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Vista Home
import Home from './views/Home';

// Componentes
import Footer from './components/Footer';
import Header from './components/Header';

export default function RoutesFunction() {
  return (
    <div className='root-container'>
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}