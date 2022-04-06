import "./EpicImage.css"

export default function EpicImage({ imageData, filterCollection }) {
    const date = new Date(imageData.date?.slice(0, 10))
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yyyy = date.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    const formatedDate = yyyy + '/' + mm + '/' + dd
    const imageType = 'png'
    const imageName = imageData.image
    const url = `https://epic.gsfc.nasa.gov/archive/${filterCollection}/${formatedDate}/${imageType}/${imageName}.${imageType}`

    return (
        <section className="epic-image-container">
            <h2>EPIC IMAGES</h2>
            {filterCollection && imageData &&
                <article className="epic-image-card">
                    <img src={url} title={imageName} alt='imagen' />
                    <section className="epic-image__data">
                        <div className="epic-image__data-items">
                            <p>Coords</p>
                            <div>
                                <p>lat: <span>{imageData.centroid_coordinates.lat}</span></p>
                                <p>lon: <span>{imageData.centroid_coordinates.lon}</span></p>
                            </div>
                        </div>
                        <div className="epic-image__data-items">
                            <p>DSCOVR position</p>
                            <div>
                                <p>x: <span>{imageData.dscovr_j2000_position.x}</span></p>
                                <p>y: <span>{imageData.dscovr_j2000_position.y}</span></p>
                                <p>z: <span>{imageData.dscovr_j2000_position.z}</span></p>
                            </div>
                        </div>
                        <div className="epic-image__data-items">
                            <p>Lunar position</p>
                            <div>
                                <p>x: <span>{imageData.lunar_j2000_position.x}</span></p>
                                <p>y: <span>{imageData.lunar_j2000_position.y}</span></p>
                                <p>z: <span>{imageData.lunar_j2000_position.z}</span></p>
                            </div>
                        </div>
                        <div className="epic-image__data-items">
                            <p>Sun position</p>
                            <div>
                                <p>x: <span>{imageData.sun_j2000_position.x}</span></p>
                                <p>y: <span>{imageData.sun_j2000_position.y}</span></p>
                                <p>z: <span>{imageData.sun_j2000_position.z}</span></p>
                            </div>
                        </div>
                    </section>
                </article>
            }
        </section>
    )
}