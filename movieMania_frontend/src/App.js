import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import MovieDetailsPage from "./pages/MovieDetailsPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
