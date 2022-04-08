
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import PreviewCardMultimedia from "../components/PreviewCardMultimedia"
import "./Multimedia.css"


export default function Multimedia() {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState('1')
    const [title, setTitle] = useState('')
    const [mediaType, setMediaType] = useState('image,video')
    let url = `https://images-api.nasa.gov/search?q=${title || 'nasa'}`
    if (page) url += `&page=${page}`
    if (mediaType) url += `&media_type=${mediaType}`

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
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
    }, [isLoading, url, page, title, mediaType])

    if (!data) return <Loading />

    return (
        <main className="images-videos-page">
            <h2>Multimedia</h2>
            <section className="search-container">
                <form>
                    <input autoFocus value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='Search...' />
                </form>
                <div className="buttons-media-type-container">
                    <button onClick={() => setMediaType('video')}>Videos</button>
                    <button onClick={() => setMediaType('image')}>Images</button>
                    <button onClick={() => setMediaType('video,image')}>All</button>
                </div>
            </section>
            <section className="preview-container">
                {data?.length > 1 ? data?.map(item => {
                    return (
                        <PreviewCardMultimedia key={Math.random()} item={item} />
                    )
                }) : <p className="no-results">No hay resultados</p>}
                <div className="buttons-container">
                    <span onClick={() => setPage(Number(page) - 1)}>{Number(page) !== 1 && '⬅️'}</span>
                    <p>{page}</p>
                    <span onClick={() => setPage(Number(page) + 1)}>➡️</span>
                </div>
            </section>
        </main>
    )
}