import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"


const Navbar = (props) => {
    const [theme, setTheme] = useState("light")

    const ThemeHandler = () => {
        const theTheme = theme == "light"? "dark": "light"
        setTheme(theTheme)
        props.onChangeTheme(theTheme)
    }
    useEffect(()=>{
        setTheme(sessionStorage.getItem("theme"))
    },[theme])
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <button
                className="navbar-toggler d-lg-none mx-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsenavbar"
                aria-controls="collapsenavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <i className="fa-solid fa-navicon fs-3"></i>
            </button>
            <div className="collapse navbar-collapse" id="collapsenavbar">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className={({isActive}) => isActive? 'nav-link active' : 'nav-link'} to="/">
                            خانه
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => isActive? "nav-link active" : "nav-link"} to="/tts">
                            تبدیل متن به صوتی
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive}) => isActive? "nav-link active": "nav-link"} to="/stt">
                            تبدیل صوتی به متن
                        </NavLink>
                    </li>
                </ul>
            </div>
            <button className="btn" title="تم صفحه" id="toggle-theme" onClick={() => ThemeHandler()}>
                {(theme === "light") && (
                    <i className="fa-regular fa-sun text-primary fs-3"></i>
                )}
                {(theme === "dark") && (
                    <i className="fa-solid fa-moon text-primary fs-3"></i>
                )}
            </button>
        </nav>
    )
}

export default Navbar