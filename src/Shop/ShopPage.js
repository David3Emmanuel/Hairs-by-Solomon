import { useContext } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import useShop from "./useShop";
import { GlobalContext } from "../utils/globalStates";

import "./ShopPage.css";

export default function ShopPage() {
    const products = useShop();
    const { userDetails } = useContext(GlobalContext);

    return <div className="shop">
        <h1>Shop</h1>
        {userDetails && userDetails.role === "admin" && <Link to="/product/new">Add New Product</Link>}
        {!products && <p>No products yet</p>}
        <div className="shop-products">
            {products && products.map(product => <Product {...product} key={product.id} />)}
        </div>
    </div>
}