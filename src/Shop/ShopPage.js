import { useContext } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { GlobalContext } from "../utils/globalStates";

import "./ShopPage.css";

export default function ShopPage() {
    const { userDetails, products, loadingProducts } = useContext(GlobalContext);

    return <div className="shop">
        <h1>Shop</h1>
        {userDetails && userDetails.role === "admin" && <Link to="/product/new">Add New Product</Link>}
        {!loadingProducts && !products && <p>No products yet</p>}
        <div className="shop-products">
            {loadingProducts && <ProductSkeletons />}
            {products && products.map(product => <Product {...product} key={product.id} />)}
        </div>
    </div>
}

export function ProductSkeletons() {
    return <>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
    </>
}

function ProductSkeleton() {
    return <div
        className="product skeleton"
        style={{
            width: "10rem",
            height: "15rem",
            borderRadius: "1rem",
            border: "3px solid hsl(0, 0%, 25%)"
        }}>
    </div>
}