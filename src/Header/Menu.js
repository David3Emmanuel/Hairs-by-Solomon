import { createPortal } from "react-dom";
import "./Menu.css";
import MenuHeader from "./MenuHeader";

export default function Menu({ showMenu, setShowMenu }) {
    return createPortal(
        showMenu && <div className="menu">
            <MenuHeader showMenu={showMenu} setShowMenu={setShowMenu} />
            {/* <button onClick={() => setShowMenu(false)}>Close menu</button> */}
        </div>,
        document.getElementById("menu")
    )
}