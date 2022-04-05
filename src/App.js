
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Epic from './components/Epic';
import Header from './components/Header';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import PictureOfTheDay from './components/PictureOfTheDay';
import ErrorBoundary from './utils/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<p>Algo salió mal</p>}>
        <Header />
        <Routes>
          <Route path='/' element={<PictureOfTheDay />} />
          <Route path='/epic' element={<Epic />} />
          <Route path='/mars-rover-photos' element={<MarsRoverPhotos />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App;
