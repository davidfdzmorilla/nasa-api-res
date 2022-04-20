import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Epic from '../pages/Epic'
import Home from '../pages/Home'
import MarsRoverPhotos from '../pages/MarsRoverPhotos'
import MarsWeather from '../pages/MarsWeather'
import PictureOfTheDay from '../pages/PictureOfTheDay';
import Multimedia from '../pages/Multimedia'
import { Error404 } from '../components/Error404'

export const RoutesComponent = ({ scrollY }) => {
  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/picture-of-the-day' element={<PictureOfTheDay />} />
      <Route path='/epic' element={<Epic scrollY={scrollY} />} />
      <Route path='/mars-rover-photos' element={<MarsRoverPhotos scrollY={scrollY} />} />
      <Route path='/mars-weather' element={<MarsWeather />} />
      <Route path='/multimedia' element={<Multimedia scrollY={scrollY} />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  )
}
