import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../utils/globalStates";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import "./Header.css";
import Menu from "./Menu";
import NavItems from "./NavItems";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return <header>
        <div className="title-row">
            <p className="material-icons menu-btn" onClick={() => setShowMenu(true)}>menu</p>
            <Link to="/"><h1>HAIRS BY SOLOMON</h1></Link>
        </div>
        <NavItems setShowProfile={setShowProfile} />
        <form action="shop" className="menu-form">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button>SEARCH</button>
        </form>
        {showProfile && <ProfileMenu />}
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
}

function ProfileMenu() {
    const navigate = useNavigate();
    const { userDetails } = useContext(GlobalContext);

    if (userDetails) return <div className="profile-menu">
        <p>{userDetails.name}</p>
        <p>{userDetails.email}</p>
        <Link to="/wishlist" style={{display: "block"}}>Wishlist</Link>
        <button style={{
            backgroundColor: "hsl(197, 71%, 50%)",
            display: "block",
            margin: "1rem auto",
            borderBottom: "none",
            padding: "0.5rem 1rem"
        }} onClick={() => {
            signOut(auth).then(() => {
                navigate("/");
            })
        }}>LOG OUT</button>
    </div>
}