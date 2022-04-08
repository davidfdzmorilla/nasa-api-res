import { Link, useNavigate, useLocation } from "react-router-dom"
import "./Header.css"

export default function Header() {
    const navigate = useNavigate()
    return (
        <header>
            <div onClick={() => navigate('/')} className="logo-container">
                <div className="logo" />
                <h1 className="link-to-home">Nasa App</h1>
            </div>
            <ul>
                <li>
                    <Link className={(useLocation().pathname === '/multimedia') ? 'active link-menu-item' : 'link-menu-item'} to='/multimedia'>MULTIMEDIA</Link>
                </li>
                <li>
                    <Link className={(useLocation().pathname === '/mars-weather') ? 'active link-menu-item' : 'link-menu-item'} to='/mars-weather'>MARS WEATHER</Link>
                </li>
                <li>
                    <Link className={(useLocation().pathname === '/mars-rover-photos') ? 'active link-menu-item' : 'link-menu-item'} to='/mars-rover-photos'>MARS ROVER PHOTOS</Link>
                </li>
                <li>
                    <Link className={(useLocation().pathname === '/picture-of-the-day') ? 'active link-menu-item' : 'link-menu-item'} to='/picture-of-the-day'>PICTURE OF THE DAY</Link>
                </li>
                <li>
                    <Link className={(useLocation().pathname === '/epic') ? 'active link-menu-item' : 'link-menu-item'} to='/epic'>EPIC</Link>
                </li>
            </ul>
            <div />
            <div>
                <div className="links-logos-container">
                    <a href="https://www.linkedin.com/in/davidfdzmorilla/" target='_blank' rel="nopener noreferrer"><div className="linkedin-logo" /></a>
                    <a href="https://github.com/davidfdzmorilla" target='_blank' rel="nopener noreferrer"><div className="github-logo" /></a>
                    <a href="https://davidfdzmorilla.dev" target='_blank' rel="nopener noreferrer"><div className="portfolio-logo" /></a>
                </div>
                <p>davidfdzmorilla</p>
            </div>
        </header>
    )
}