import React from 'react'
import { Link } from 'react-router-dom'

import "./Error404.css"

export const Error404 = () => {
  return (
    <div className='error-404'>
      <h1>Error 404</h1>
      <p>Sitio no encontrado.</p>
      <Link to='/home'>Volver</Link>
    </div>
  )
}
