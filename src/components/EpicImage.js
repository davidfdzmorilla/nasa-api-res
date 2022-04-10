import { useRef } from 'react'
import LazyLoad from "react-lazy-load"
import "./EpicImage.css"

export default function EpicImage({ data, filterCollection, dateImage }) {
    const date = new Date(dateImage)
    const imageType = 'png'
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
    const newData = data?.map(item => {
        return {
            date: item.date,
            url: `https://epic.gsfc.nasa.gov/archive/${filterCollection}/${formatedDate && formatedDate}/${imageType}/${item.image}.${imageType}`,
            coords: {
                lat: item.centroid_coordinates.lat,
                long: item.centroid_coordinates.lon
            },
            DSCOVRPos: {
                x: item.dscovr_j2000_position.x,
                y: item.dscovr_j2000_position.y,
                z: item.dscovr_j2000_position.z
            },
            lunarPos: {
                x: item.lunar_j2000_position.x,
                y: item.lunar_j2000_position.y,
                z: item.lunar_j2000_position.z
            },
            sunPos: {
                x: item.sun_j2000_position.x,
                y: item.sun_j2000_position.y,
                z: item.sun_j2000_position.z
            }
        }
    })

    return (
        <section className="epic-images-container">
            {filterCollection && newData && newData.map(item => {
                return (
                    <article key={Math.random()} className="epic-image-card">
                        <span className="date">📆 {item.date}</span>
                        <LazyLoad width={"100%"} debounce={false} offsetVertical={200}>
                            <img src={item.url} title={item.url} alt={item.url} />
                        </LazyLoad>
                        <section className="epic-image__data">
                            <div className="epic-image__data-items">
                                <p>Coords</p>
                                <div>
                                    <p>lat: <span>{item.coords.lat}</span></p>
                                    <p>lon: <span>{item.coords.long}</span></p>
                                </div>
                            </div>
                            <div className="epic-image__data-items">
                                <p>DSCOVR position</p>
                                <div>
                                    <p>x: <span>{item.DSCOVRPos.x}</span></p>
                                    <p>y: <span>{item.DSCOVRPos.y}</span></p>
                                    <p>z: <span>{item.DSCOVRPos.z}</span></p>
                                </div>
                            </div>
                            <div className="epic-image__data-items">
                                <p>Lunar position</p>
                                <div>
                                    <p>x: <span>{item.lunarPos.x}</span></p>
                                    <p>y: <span>{item.lunarPos.y}</span></p>
                                    <p>z: <span>{item.lunarPos.z}</span></p>
                                </div>
                            </div>
                            <div className="epic-image__data-items">
                                <p>Sun position</p>
                                <div>
                                    <p>x: <span>{item.sunPos.x}</span></p>
                                    <p>y: <span>{item.sunPos.y}</span></p>
                                    <p>z: <span>{item.sunPos.z}</span></p>
                                </div>
                            </div>
                        </section>
                    </article>
                )
            })

            }
        </section>
    )
}