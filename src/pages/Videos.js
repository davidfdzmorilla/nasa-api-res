
import { useEffect, useState } from "react"
import Loading from "../utils/Loading"
import PreviewCard from "../components/PreviewCard"
import "./Videos.css"


export default function Videos() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState('')
    const [title, setTitle] = useState('')
    const [mediaType, setMediaType] = useState('video')
    let url = `https://images-api.nasa.gov/search?title=${title || 'nasa'}`
    if (page) url += `&page=${page}`
    if (mediaType) url += `&media_type=${mediaType}`
    // console.log(url)

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                console.log(data.collection.items[4])
                setError(null)
                setIsLoading(true)
                const imagesArray = data?.collection.items.map(item => {
                    return {
                        urlImage: item.links[0].href,
                        title: item.data[0].title,
                        description: item.data[0].description,
                        dataJson: item.href,
                        mediaType: item.data[0].media_type
                    }
                })
                setData(imagesArray)
                setPage(page)

            } catch (error) {
                setError(error)
            }
        }
        loadData()
    }, [isLoading, url, page, title,])



    return (
        <main className="images-videos-page">
            <h2>Images & Videos</h2>
            <form>
                <label>Search for title content</label>
                <input value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Search' />
            </form>
            <section className="preview-container">
                {data.length > 1 ? data?.map(item => {
                    return (
                        <PreviewCard item={item} />
                    )
                }) : <p>No hay resultedos</p>}
                <div className="buttons-container">
                    <span onClick={() => setPage(Number(page) - 1)}>{Number(page) !== 1 && '⬅️'}</span>
                    <span onClick={() => setPage(Number(page) + 1)}>➡️</span>
                </div>
            </section>
        </main>
    )
}