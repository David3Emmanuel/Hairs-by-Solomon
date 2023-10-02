import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavItems from "./NavItems";
import ProfileMenu from "./ProfileMenu";
import useOutsideAlerter from "./useOutsideAlerter";

export default function MenuHeader({ setShowMenu }) {
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => setShowMenu(false));

    return <>
        <header>
            <div className="title-row">
                <p className="material-icons menu-btn" onClick={() => setShowMenu(false)}>close</p>
                <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
            </div>
        </header>
        <div ref={menuRef}>
            <form action="shop" className="menu-form">
                <input name="search" placeholder="Search for a product..." className="search" />
                <button>SEARCH</button>
            </form>
            <NavItems className="menu-nav" hideProfile />
            <ProfileMenu />
        </div>
    </>
}