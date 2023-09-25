import { Link } from "react-router-dom";
import "./Header.css";
import NavItems from "./NavItems";

export default function MenuHeader({ showMenu, setShowMenu }) {
    return <>
        <header>
            <p className="material-icons menu-btn" onClick={() => setShowMenu(false)}>close</p>
            <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
        </header>
        <form action="shop">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button>SEARCH</button>
        </form>
        <NavItems className="menu-nav" />
    </>
}