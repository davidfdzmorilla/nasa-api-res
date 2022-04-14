
import { useState } from "react"
import LazyLoad from "react-lazy-load"
import { AiOutlineVideoCamera, AiOutlineCamera } from 'react-icons/ai';
import "./PreviewCardMultimedia.css"

export default function PreviewCardMultimedia({ item }) {
    const [videoMp4, setVideoMp4] = useState('')
    const [image, setImage] = useState('')
    let iconMediaType
    if (item.mediaType === 'video') iconMediaType = <AiOutlineVideoCamera className="icon-mediatype" />
    if (item.mediaType === 'image') iconMediaType = <AiOutlineCamera className="icon-mediatype" />
    const handleDataItem = async () => {
        const response = await fetch(item.dataJson)
        if (response.ok) {

        } else {
            console.log('ok')
        }
        const dataItem = await response.json()
        if (item.mediaType === 'video') setVideoMp4(dataItem.filter((i) => i.includes("preview.mp4")))
        if (item.mediaType === 'image') setImage(dataItem.filter((i) => i.includes("thumb.jpg")))
    }

    return (
        <article className="preview-card">
            {iconMediaType}
            <LazyLoad width={"100%"} debounce={false} offsetVertical={200}>
                <img onClick={handleDataItem} width='200px' height='200px' src={item.urlImage} alt='Access Denied' />
            </LazyLoad>
            <p>{item.title}</p>
            {videoMp4 && <article onClick={() => setVideoMp4('')} className="preview-video-conatiner">
                <label>{item.title}</label>
                <video src={videoMp4} width='800px' height='400px' autoPlay controls />
                <button onClick={() => setVideoMp4('')}>Exit</button>
            </article>
            }
            {image && <article onClick={() => setVideoMp4('')} className="preview-video-conatiner">
                <label>{item.title}</label>
                <img src={image} width='800px' height='400px' alt={image} />
                <button onClick={() => setImage('')}>Exit</button>
            </article>}
        </article>
    )
}