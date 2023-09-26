import { Link } from "react-router-dom";
import "./Header.css";
import NavItems from "./NavItems";

export default function MenuHeader({ showMenu, setShowMenu }) {
    return <>
        <header>
            <div className="title-row">
                <p className="material-icons menu-btn" onClick={() => setShowMenu(false)}>close</p>
                <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
            </div>
        </header>
        <form action="shop" className="menu-form">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button>SEARCH</button>
        </form>
        <NavItems className="menu-nav" />
    </>
}