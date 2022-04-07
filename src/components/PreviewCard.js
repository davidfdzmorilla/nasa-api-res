
import { useState } from "react"
import "./PreviewCard.css"

export default function PreviewCard({ item }) {
    const [videoMp4, setVideoMp4] = useState('')
    const handleDataItem = async () => {
        const response = await fetch(item.dataJson)
        const dataItem = await response.json()
        setVideoMp4(dataItem.filter((i) => i.includes("preview.mp4")))
    }

    return (
        <article className="preview-card">
            <img onClick={handleDataItem} width='200px' height='200px' src={item.urlImage} alt='' />
            <p>{item.title}</p>
            {videoMp4 && <article onClick={() => setVideoMp4('')} className="preview-video-conatiner">
                <label>{item.title}</label>
                <video src={videoMp4} width='800px' height='400px' autoPlay controls />
                <button onClick={() => setVideoMp4('')}>Exit</button>
            </article>
            }
        </article>
    )
}