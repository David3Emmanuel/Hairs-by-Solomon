import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../utils/globalStates";
import "./NavItems.css";

export default function NavItems({ className, hideProfile = false, setShowProfile, setShowMenu }) {
    const { userDetails } = useContext(GlobalContext);

    return <nav className={className}>
        <NavItem name="Home" icon="home" to="/" />
        <NavItem name="Shop" icon="shopping_cart" to="/shop" />
        <NavItem name="Wishlist" icon="favorite" to="/wishlist" />
        <NavItem name="Contact" icon="phone" to="/contact" />

        {userDetails && !hideProfile && <div className="profile-nav-item nav-item">
            <span className="profile-icon header-icon" onClick={() => setShowProfile(true)}>{userDetails.name[0]}</span>
            <span className="header-icon-text">My Profile</span>
        </div>}
        {!userDetails && <NavItem name="Sign Up" icon="person" to="/login" className="sign-up" />}

    </nav>
}

export function NavItem({ name, icon, to, className="" }) {
    return <NavLink to={to} className={`${className} nav-item`}>
        <span className="material-icons-outlined header-icon">{icon}</span>
        <span className="header-icon-text">{name}</span>
    </NavLink>
}