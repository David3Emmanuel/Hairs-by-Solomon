import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import Menu from "./Menu";
import NavItems from "./NavItems";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return <header>
        <div className="title-row">
            <p className="material-icons menu-btn" onClick={() => setShowMenu(true)}>menu</p>
            <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
        </div>
        <NavItems />
        <form action="shop" className="menu-form">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button>SEARCH</button>
        </form>
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
}