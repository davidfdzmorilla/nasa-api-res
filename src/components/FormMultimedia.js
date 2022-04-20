import React from 'react'

export const FormMultimedia = ({ title, setTitle, mediaType, setMediaType }) => {
  return (
    <section className="search-container">
      <form>
        <input autoFocus value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Search...' />
      </form>
      <div className="buttons-media-type-container">
        <button className={mediaType === 'video' ? 'active' : ''} onClick={() => setMediaType('video')}>Videos</button>
        <button className={mediaType === 'image' ? 'active' : ''} onClick={() => setMediaType('image')}>Images</button>
        <button className={mediaType === 'image,video' ? 'active' : ''} onClick={() => setMediaType('image,video')}>All</button>
      </div>
    </section>
  )
}
