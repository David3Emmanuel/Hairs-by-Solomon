import { NavLink } from "react-router-dom";
import "./NavItems.css";

export default function NavItems({ className }) {
    return <nav className={className}>
        <NavItem name="Shop" icon="shopping_cart" to="/shop" />
        <NavItem name="Wishlist" icon="favorite" to="/wishlist" />
        <NavItem name="Contact" icon="phone" to="/contact" />
        <NavItem name="Sign Up" icon="person" to="/login" />
    </nav>
}

function NavItem({ name, icon, to }) {
    return <NavLink to={to} className="nav-item">
        <span className="material-icons-outlined header-icon">{icon}</span>
        <span className="header-icon-text">{name}</span>
    </NavLink>
}