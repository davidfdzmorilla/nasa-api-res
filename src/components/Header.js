import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
    return (
        <header>
            <Link className="link-to-home" to='/'>Api Nasa</Link>
            <ul>
                <li>
                    <Link className="link-menu-item" to='/'>PHOTO OF THE DAY</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/epic'>EPIC</Link>
                </li>
                <li>
                    <Link className="link-menu-item" to='/mars-rover-photos'>MARS ROVER PHOTOS</Link>
                </li>
            </ul>
            <div />
        </header>
    )
}