import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import "./Epic.css"
import EpicImage from "../components/EpicImage"


export default function Epic({ scrollY }) {
    const [data, setData] = useState(null)
    const [filterCollection, setFilterCollection] = useState('natural')
    const [url, setUrl] = useState(`https://api.nasa.gov/EPIC/api/${filterCollection}?api_key=3bCO3vHTdW0kbNyMN986HguufD9aXbwb79KATW3d`)
    const [dateImage, setDateImage] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleClickScrollUp = () => {
        window.scroll(0, document.getElementsByClassName('images-videos-page')?.offsetTop)
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
                setDateImage(data[0].date.slice(0, 10))
                setError(null)
                setIsLoading(true)
            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, url, filterCollection])

    if (!data) return <Loading />

    return (
        <main className="epic-page">
            <h2>EPIC IMAGES</h2>
            <section className="menu-filter">
                <form>
                    <label>
                        Filter
                        <input type='date' value={dateImage} onChange={e => {
                            setDateImage(e.target.value)
                            setIsLoading(!isLoading)
                        }} max={new Date().toISOString().slice(0, 10)} />
                    </label>
                    {/* <select>
                        <option onClick={e => {setFilterCollection(e.target.value)}} value='natural' defaultValue>Natural</option>
                        <option onClick={e => setFilterCollection(e.target.value)} value='enhanced'>Enhanced</option>
                    </select>
                    <button>Search</button> */}
                </form>
            </section>
            {Number(scrollY) > 200 && <span className="scroll-up-button" onClick={handleClickScrollUp}>⬆️</span>}
            {data && <EpicImage data={data} filterCollection={filterCollection} dateImage={dateImage} />}
        </main>
    )
}