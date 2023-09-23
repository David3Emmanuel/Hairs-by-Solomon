import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return <header>
        <p className="material-icons menu-btn">menu</p>
        <h1>HAIRS BY SOLOMON</h1>
        <nav>
            <NavItem name="Wishlist" icon="favorite" />
            <NavItem name="Contact" icon="mail" />
            <NavItem name="Sign Up" icon="person" />
        </nav>
    </header>
}

function NavItem({ name, icon }) {
    return <Link to="/" className="nav-item">
        <span className="material-icons-outlined header-icon">{icon}</span>
        <span className="header-icon-text">{name}</span>
    </Link>
}