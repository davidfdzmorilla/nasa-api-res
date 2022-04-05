import { useEffect, useState } from "react"
import "./Main.css"


export default function Main() {
    const [data, setData] = useState({ date: '', explanation: '', hdurl: '', title: '' })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

    const handleDay = e => {
        e.preventDefault()
        setIsLoading(!isLoading)
    }
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=3bCO3vHTdW0kbNyMN986HguufD9aXbwb79KATW3d&date=' + date)
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

    return (
        <main>
            <h2>NASA Astronomy Picture Of The Day</h2>
            <form onSubmit={handleDay}>
                <label>
                    Choose date of the photo of the day
                    <input onChange={e => setDate(e.target.value)} type='date' max={new Date(1)} />
                </label>
                <button>Envíar</button>
            </form>
            <article className="card-image-of-day">
                <img src={data.hdurl} title={data.title} alt={data.title} />
                <section className="data-image">
                    <h3>{data.title}</h3>
                    <p className="card-iamge-of-day__date">{data.date}</p>
                    <p className="card-iamge-of-day__explanation">{data.explanation}</p>
                </section>
            </article>
        </main>
    )
}