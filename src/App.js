
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Epic from './pages/Epic';
import Header from './components/Header';
import MarsRoverPhotos from './pages/MarsRoverPhotos';
import PictureOfTheDay from './pages/PictureOfTheDay';
import ErrorBoundary from './utils/ErrorBoundary';
import MarsWeather from './pages/MarsWeather';

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<p>Algo salió mal</p>}>
        <Header />
        <Routes>
          <Route path='/' element={<PictureOfTheDay />} />
          <Route path='/epic' element={<Epic />} />
          <Route path='/mars-rover-photos' element={<MarsRoverPhotos />} />
          <Route path='/mars-weather' element={<MarsWeather />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App;
