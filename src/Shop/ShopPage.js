import { Link } from "react-router-dom";

import Product from "./Product";
import "./ShopPage.css";
import useShop from "./useShop";

export default function ShopPage() {
    const products = useShop();

    return <div className="shop">
        <h1>Shop</h1>
        <Link to="/product/new">Add New Product</Link>
        {!products && <p>No products yet</p>}
        <div className="shop-products">
            {products && products.map(product => <Product {...product} key={product.id} />)}
        </div>
    </div>
}