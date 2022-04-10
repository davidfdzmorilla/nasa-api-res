
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Epic from './pages/Epic';
import Header from './components/Header';
import MarsRoverPhotos from './pages/MarsRoverPhotos';
import PictureOfTheDay from './pages/PictureOfTheDay';
import ErrorBoundary from './utils/ErrorBoundary';
import MarsWeather from './pages/MarsWeather';
import Multimedia from './pages/Multimedia'
import Home from './pages/Home';

function App() {
  const [scrollY, setScrolly] = useState(null)
  window.onscroll = function () {
    let y = window.scrollY
    setScrolly(y)
  }
  return (
    <div className="App">
      <ErrorBoundary fallback={<p>Algo salió mal</p>}>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/picture-of-the-day' element={<PictureOfTheDay />} />
          <Route path='/epic' element={<Epic scrollY={scrollY} />} />
          <Route path='/mars-rover-photos' element={<MarsRoverPhotos scrollY={scrollY} />} />
          <Route path='/mars-weather' element={<MarsWeather />} />
          <Route path='/multimedia' element={<Multimedia scrollY={scrollY} />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App;
