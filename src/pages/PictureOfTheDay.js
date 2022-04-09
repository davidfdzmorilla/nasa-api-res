import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import "./PictureOfTheDay.css"

const API_KEY = process.env.REACT_APP_NASA_API_KEY


export default function Main() {
    const [data, setData] = useState({ date: '', explanation: '', hdurl: '', title: '' })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

    const handleDay = e => {
        e.preventDefault()
        setIsLoading(!isLoading)
    }

    const handlePrevDay = () => {
        const newTimestamp = Date.parse(date) - 86400000
        const newDay = new Date(newTimestamp).toISOString().slice(0, 10)
        setDate(newDay)
    }

    const handleNextDay = () => {
        const newTimestamp = Date.parse(date) + 86400000
        const newDay = new Date(newTimestamp).toISOString().slice(0, 10)
        if (newTimestamp < new Date()) {
            setDate(newDay)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=` + date)
                const data = await response.json()
                setData(data)
                setError(null)
                setIsLoading(true)
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, date])

    if (!data.date) return <Loading />

    return (
        <main className="picture-of-the-day">
            <h2>NASA Astronomy Picture Of The Day</h2>
            <form onSubmit={handleDay}>
                <button onClick={handlePrevDay}>PREV</button>
                <label>
                    Choose date of the photo of the day
                    <input value={date} max={new Date().toISOString().slice(0, 10)} onChange={e => setDate(e.target.value)} type='date' />
                </label>
                <button onClick={handleNextDay}>NEXT</button>
            </form>
            <article className="card-image-of-day">
                {data.media_type === 'image' && <img src={data.hdurl} title={data.title} alt={data.title} />}
                {data.media_type === 'video' && <iframe width="760" height="415" src={data.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
                <section className="data-image">
                    <span>{data.title}</span>
                    <span>📅 {data.date}</span>
                    <p className="card-iamge-of-day__explanation">{data.explanation}</p>
                </section>
            </article>
        </main>
    )
}