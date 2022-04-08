import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

export default function Header() {
    const navigate = useNavigate()
    return (
        <header>
            <div onClick={() => navigate('/videos')} className="logo-container">
                <div className="logo" />
                <h1 className="link-to-home">Api Nasa</h1>
            </div>
            <ul>
                <li>
                    <Link className="link-menu-item" to='/videos'>VIDEOS</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/mars-weather'>MARS WEATHER</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/mars-rover-photos'>MARS ROVER PHOTOS</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/picture-of-the-day'>PICTURE OF THE DAY</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/epic'>EPIC</Link>
                </li>
            </ul>
            <div />
        </header>
    )
}