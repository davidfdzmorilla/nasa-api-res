
import { useEffect, useState } from "react"
import { FormMultimedia } from "../components/FormMultimedia"
import Loading from "../components/Loading"
import PreviewCardMultimedia from "../components/PreviewCardMultimedia"
import "./Multimedia.css"


export default function Multimedia({ scrollY }) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState('1')
    const [title, setTitle] = useState('')
    const [mediaType, setMediaType] = useState('image,video')

    let url = `https://images-api.nasa.gov/search?q=${title || 'nasa'}`
    if (page) url += `&page=${page}`
    if (mediaType) url += `&media_type=${mediaType}`

    const handleClickScrollUp = () => {
        window.scroll(0, document.getElementsByClassName('images-videos-page')?.offsetTop)
    }

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
    }, [isLoading, mediaType, page, url])

    if (!data) return <Loading />

    return (
        <main className="images-videos-page">
            <h2>Multimedia</h2>
            <FormMultimedia
                title={title}
                setTitle={setTitle}
                mediaType={mediaType}
                setMediaType={setMediaType}
            />
            {error && <h3>{error}</h3>}
            <section className="preview-container">
                {data?.length > 1 ? data?.map(item => {
                    return (
                        <PreviewCardMultimedia key={Math.random()} item={item} />
                    )
                }) : <p className="no-results">No hay resultados</p>}
                <section className="buttons-container">
                    {page > 1 && <button onClick={() => {
                        setPage(Number(page) - 1)
                        handleClickScrollUp()
                    }}>Anterior</button>}
                    <span>Page: {page < 1 ? setPage(1) : page}</span>
                    <button onClick={() => {
                        setPage(Number(page) + 1)
                        handleClickScrollUp()
                    }}>Next</button>
                </section>
            </section>
            {Number(scrollY) > 200 && <span className="scroll-up-button" onClick={handleClickScrollUp}>⬆️</span>}
        </main>
    )
}