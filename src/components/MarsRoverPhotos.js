import { useEffect, useState } from "react"
import Loading from "../utils/Loading"

import "./MarsRoverPhotos.css"

export default function MarsRoverPhotos() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=3bCO3vHTdW0kbNyMN986HguufD9aXbwb79KATW3d`
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
                setError(null)
                setIsLoading(true)
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, url, page])

    if (!data) return <Loading />
    return (
        <main className="mars-rover-photos-page">
            <h2>Mars Rover Photos-page</h2>
            {data.photos?.map(item => {
                return (
                    <article className="mars-rover-photos-card" key={item.id}>
                        <a href={item.img_src} target='_blank' rel='noreferrer nopener'>
                            <img src={item.img_src} alt={'Photo' + item.id} />
                        </a>
                    </article>
                )
            })}
            <section className="buttons-container">
                <button onClick={() => setPage(page - 1)}>Anterior</button>
                <span>Page: {page < 1 ? setPage(1) : page}</span>
                <button onClick={() => setPage(page + 1)}>Siguiente</button>
            </section>
        </main>
    )
}