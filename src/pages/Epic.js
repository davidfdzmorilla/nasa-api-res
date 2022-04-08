import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import "./Epic.css"
import EpicImage from "../components/EpicImage"


export default function Epic() {
    const [data, setData] = useState(null)
    const [filterCollection, setFilterCollection] = useState('natural')
    const [url, setUrl] = useState(`https://api.nasa.gov/EPIC/api/${filterCollection}?api_key=3bCO3vHTdW0kbNyMN986HguufD9aXbwb79KATW3d`)
    const [imageData, setImageData] = useState({})
    const [dateImage, setDateImage] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
                setError(null)
                setIsLoading(true)
                setImageData(data[0])
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, url, filterCollection])

    const handleSubmit = e => {
        e.preventDefault()
        setUrl(`https://api.nasa.gov/EPIC/api/${filterCollection}/date/${dateImage.slice(0, 10)}?api_key=3bCO3vHTdW0kbNyMN986HguufD9aXbwb79KATW3d`)
    }

    if (!data) return <Loading />

    return (
        <main className="epic-page">
            <section className="menu-filter">
                <form onSubmit={handleSubmit}>
                    <label>
                        Filter
                        <input type='date' onChange={e => setDateImage(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
                    </label>
                    <select onChange={e => setFilterCollection(e.target.value)}>
                        <option value='natural' defaultValue>Natural</option>
                        <option value='enhanced'>Enhanced</option>
                    </select>
                    <button>Enviar</button>
                </form>
                <ul>
                    <h3>Pictures List</h3>
                    {data.length > 0 ? data?.map(item => {
                        return (
                            <li key={Math.random()} onClick={() => setImageData(item)}>
                                {item.date}
                            </li>
                        )
                    }) : <p>Lo sentimos, no hay fotos para la fecha seleccionada.</p>}
                </ul>
            </section>
            {imageData?.image && <EpicImage imageData={imageData} filterCollection={filterCollection} />}
        </main>
    )
}