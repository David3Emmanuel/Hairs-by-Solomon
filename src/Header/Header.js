import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import "./Header.css";
import Menu from "./Menu";
import NavItems from "./NavItems";
import ProfileMenu from "./ProfileMenu";
import useOutsideAlerter from "./useOutsideAlerter";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const profileRef = useRef(null);
    useOutsideAlerter(profileRef, () => {
        setTimeout(() => setShowProfile(false), 100);
    });

    return <header>
        <div className="title-row">
            <p className="material-icons menu-btn" onClick={() => setShowMenu(true)}>menu</p>
            <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
        </div>
        <NavItems showProfile={showProfile} setShowProfile={setShowProfile} />
        <form action="shop" className="menu-form">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button>SEARCH</button>
        </form>
        {showProfile && <ProfileMenu profileRef={profileRef} />}
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
}