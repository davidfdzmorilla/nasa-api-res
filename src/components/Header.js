import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FaGithub, FaLinkedin, FaLink } from 'react-icons/fa';
import "./Header.css"

export default function Header() {
    const pathName = useLocation().pathname
    const [showBar, setShowBar] = useState(true)
    const navigate = useNavigate()
    return (
        <header>
            <div onClick={() => navigate('/')} className="logo-container">
                <div className="logo" />
                <h1 className="link-to-home">Nasa App</h1>
            </div>
            <ul>
                {!showBar ? <li className='menu-icon-container' onClick={() => setShowBar(!showBar)}><h3>MENU</h3></li>
                    : <>
                        <li>
                            <Link className={(pathName === '/multimedia') ? 'active link-menu-item' : 'link-menu-item'} to='/multimedia'>MULTIMEDIA</Link>
                        </li>
                        <li>
                            <Link className={(pathName === '/mars-weather') ? 'active link-menu-item' : 'link-menu-item'} to='/mars-weather'>MARS WEATHER</Link>
                        </li>
                        <li>
                            <Link className={(pathName === '/mars-rover-photos') ? 'active link-menu-item' : 'link-menu-item'} to='/mars-rover-photos'>MARS ROVER PHOTOS</Link>
                        </li>
                        <li>
                            <Link className={(pathName === '/picture-of-the-day') ? 'active link-menu-item' : 'link-menu-item'} to='/picture-of-the-day'>PICTURE OF THE DAY</Link>
                        </li>
                        <li>
                            <Link className={(pathName === '/epic') ? 'active link-menu-item' : 'link-menu-item'} to='/epic'>EPIC</Link>
                        </li>
                        <div className='close-icon-container'>
                            <span className='close-bar-icon' onClick={() => setShowBar(!showBar)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-up" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3e5e94" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="12" y1="10" x2="12" y2="20" />
                                    <line x1="12" y1="10" x2="16" y2="14" />
                                    <line x1="12" y1="10" x2="8" y2="14" />
                                    <line x1="4" y1="4" x2="20" y2="4" />
                                </svg>
                            </span>
                        </div>
                    </>
                }

            </ul>
            <div />
            <div>
                <div className="links-logos-container">
                    <a href="https://www.linkedin.com/in/davidfdzmorilla/" target='_blank' rel="nopener noreferrer"><FaLinkedin className="rss-logo" /></a>
                    <a href="https://github.com/davidfdzmorilla" target='_blank' rel="nopener noreferrer"><FaGithub className="rss-logo" /></a>
                </div>
                <a href="https://davidfdzmorilla.dev" target='_blank' rel="nopener noreferrer" className="myName">davidfdzmorilla.dev</a>
            </div>
        </header>
    )
}