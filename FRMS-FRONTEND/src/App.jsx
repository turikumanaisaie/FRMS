import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';
import EditFilm from './components/EditFilm';
import FilmDetails from './components/FilmDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="/add" element={<AddFilm />} />
        <Route path="/edit/:id" element={<EditFilm />} />
        <Route path="/details/:id" element={<FilmDetails />} />
      </Routes>
    </Router>
  );
}

export default App;