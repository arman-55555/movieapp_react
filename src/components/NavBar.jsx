import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">
                <span className="brand-icon">🎬</span>
                <span className="brand-text">CinemaHub</span>
            </Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span>Home</span>
            </Link>
            <Link to="/favorites" className="nav-link">
                <span className="nav-icon">❤️</span>
                <span>Favorites</span>
            </Link>
        </div>
    </nav>
}

export default NavBar