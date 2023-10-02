import { createPortal } from "react-dom";
import "./Menu.css";
import MenuHeader from "./MenuHeader";

export default function Menu({ showMenu, setShowMenu }) {
    return createPortal(
        showMenu && <div className="menu" >
            <MenuHeader setShowMenu={setShowMenu} />
        </div>,
        document.getElementById("menu")
    )
}