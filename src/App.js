import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import PetRoutes from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter basename='/pet'
      >
        <PetRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
