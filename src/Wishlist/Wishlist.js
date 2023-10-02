import { useEffect, useContext } from "react";
import { GlobalContext } from "../utils/globalStates";
import { useNavigate } from "react-router-dom";
import Product from "../Shop/Product";
import { ProductSkeletons } from "../Shop/ShopPage";
import "../Shop/ShopPage.css";

export default function Wishlist() {
    const { userDetails, loadingUserDetails, wishlist, loadingWishlist } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingUserDetails) return;
        if (!userDetails) {
            navigate("/login");
        }
    }, [navigate, userDetails, loadingUserDetails]);

    return <div className="wishlist shop">
        <h1>My Wishlist <span className="material-icons" style={{
            color: "red",
            fontSize: "2rem"
        }}>favorite</span></h1>
        {!loadingWishlist && wishlist && wishlist.length === 0 && <p>Nothing in wishlist</p>}
        <div className="shop-products">
            {loadingWishlist && <ProductSkeletons />}
            {wishlist.map((productName, i) => <Product name={productName} key={i} />)}
        </div>
    </div>
}