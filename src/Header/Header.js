import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../utils/globalStates";

import "./Header.css";
import Menu from "./Menu";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { NavItem } from "./NavItems";
import ProfileMenu from "./ProfileMenu";
import useOutsideAlerter from "./useOutsideAlerter";

export default function Header() {
    const { userDetails } = useContext(GlobalContext);

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
        <div className="header-contents">
            <NavItems showProfile={showProfile} setShowProfile={setShowProfile} setShowMenu={setShowMenu} />
            <div style={{ display: "flex" }}>
                <SearchInput />

                <div className="header__profile-nav-item">
                    {userDetails && <div className="profile-nav-item nav-item">
                        <span className="profile-icon header-icon" onClick={() => setShowProfile(true)}>{userDetails.name[0]}</span>
                        <span className="header-icon-text">My Profile</span>
                    </div>}
                    {!userDetails && <NavItem name="Sign Up" icon="person" to="/login" />}
                </div>
            </div>

            {showProfile && <ProfileMenu profileRef={profileRef} />}
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        <div className="divider" />
    </header>
}