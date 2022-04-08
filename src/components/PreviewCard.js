
import { useState } from "react"
import "./PreviewCard.css"

export default function PreviewCard({ item }) {
    // console.log(item)
    const [videoMp4, setVideoMp4] = useState('')
    const [image, setImage] = useState('')
    let emojiMediaType
    if (item.mediaType === 'video') emojiMediaType = '🎥'
    if (item.mediaType === 'image') emojiMediaType = '📷'
    const handleDataItem = async () => {
        const response = await fetch(item.dataJson)
        const dataItem = await response.json()
        console.log(dataItem)
        if (item.mediaType === 'video') setVideoMp4(dataItem.filter((i) => i.includes("preview.mp4")))
        if (item.mediaType === 'image') setImage(dataItem.filter((i) => i.includes("large.jpg")))
    }

    return (
        <article className="preview-card">
            <span>{emojiMediaType}</span>
            <img onClick={handleDataItem} width='200px' height='200px' src={item.urlImage} alt='' />
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