import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import "./MarsWeather.css"

export default function MarsWeather() {
    const url = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json '
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        const loadData = async () => {
            try {
                const weatherMars = await (await fetch(url)).json()
                const arrayWeatherWeek = weatherMars.soles.slice(1, 6)
                setWeather(arrayWeatherWeek)
                setError(null)
                setIsLoading(true)
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading])

    if (!weather) return <Loading />

    return (
        <main className="mars-weather-page">
            <h2>Mars weather</h2>
            <section className="weather-cards-container">
                {weather?.map(weatherDay => {
                    return (
                        <article key={weatherDay.sol} className="weather-card">
                            <h3>Sol {weatherDay.sol}</h3>
                            <span> 📅 {weatherDay.terrestrial_date}</span>
                            <p>Atmo: {weatherDay.atmo_opacity}</p>
                            <p>☀️😎 {weatherDay.local_uv_irradiance_index}</p>
                            <p>🌡️ {weatherDay.max_temp}ºC</p>
                            <p>❄️ {weatherDay.min_temp}ºC</p>
                        </article>
                    )
                })}
            </section>
        </main>
    )
}