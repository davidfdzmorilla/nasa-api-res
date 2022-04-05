import { useEffect, useState } from "react"
import Loading from "../utils/Loading"
import "./Epic.css"
import EpicImage from "./EpicImage"


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
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, url])

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
                        <input type='date' onChange={e => setDateImage(e.target.value)} />
                        <select onChange={e => setFilterCollection(e.target.value)}>
                            <option value='natural' defaultValue>Natural</option>
                            <option value='enhanced'>Enhanced</option>
                        </select>
                    </label>
                    <button>Enviar</button>
                </form>
                <ul>
                    <h3>Pictures List</h3>
                    {data?.map(item => {
                        return (
                            <li key={item.id} onClick={() => setImageData(item)}>
                                {item.date}
                            </li>
                        )
                    })}
                </ul>
            </section>
            {imageData?.image && <EpicImage imageData={imageData} filterCollection={filterCollection} />}
        </main>
    )
}