import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../utils/globalStates";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import "./ProfileMenu.css";

export default function ProfileMenu({ profileRef }) {
    const navigate = useNavigate();
    const { userDetails } = useContext(GlobalContext);

    if (userDetails) return <div ref={profileRef} className="profile-menu">
        <h3><span className="profile-icon">{userDetails.name[0]}</span> {userDetails.name}</h3>
        <p>{userDetails.email}</p>
        <Link to="/wishlist" style={{ display: "block" }}>My wishlist</Link>
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