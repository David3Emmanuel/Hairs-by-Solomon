import { useEffect, useContext } from "react";
import "../Shop/ShopPage.css";
import { GlobalContext } from "../utils/globalStates";
import { useNavigate } from "react-router-dom";
import Product from "../Shop/Product";

export default function Wishlist() {
    const { userDetails, wishlist } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!userDetails) {
                navigate("/login");
            }
        }, 10_000)
        return clearTimeout(timeout);
    }, [navigate, userDetails]);

    return <div className="wishlist shop">
        <h1>My Wishlist <span className="material-icons" style={{
            color: "red",
            fontSize: "2rem"
        }}>favorite</span></h1>
        <div className="shop-products">
            {wishlist.map((productName, i) => <Product name={productName} key={i} />)}
        </div>
    </div>
}