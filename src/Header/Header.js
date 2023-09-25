import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import Menu from "./Menu";
import NavItems from "./NavItems";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return <header>
        <p className="material-icons menu-btn" onClick={() => setShowMenu(true)}>menu</p>
        <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
        <NavItems />
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
}