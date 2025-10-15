import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import ApiErrorMessage from "../components/ApiErrorMessage"
import "./Epic.css"
import EpicImage from "../components/EpicImage"

const API_KEY = process.env.REACT_APP_NASA_API_KEY

export default function Epic({ scrollY }) {
    const [data, setData] = useState(null)
    const [filterCollection] = useState('natural')
    const [dateImage, setDateImage] = useState('')
    const [error, setError] = useState(false)

    const url = `https://api.nasa.gov/EPIC/api/${filterCollection}?api_key=${API_KEY}`

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
            } catch (error) {
                console.error('Error fetching EPIC data:', error)
                setError(true)
                setData([])
            }
        }
        loadData()
    }, [url])

    if (!data) return <Loading />
    if (error) return <ApiErrorMessage apiName="EPIC Earth Imagery API" />

    return (
        <main className="epic-page">
            <h2>EPIC IMAGES</h2>
            <section className="menu-filter">
                <form>
                    <label>
                        Filter
                        <input type='date' value={dateImage} onChange={e => setDateImage(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
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