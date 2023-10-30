import { useContext } from "react";
import { useParams } from "react-router-dom";
import useProduct from "./useProduct";
import { GlobalContext } from "../utils/globalStates";
import "./ProductPage.css";

export default function ProductPage() {
    const { userDetails } = useContext(GlobalContext);
    const productName = useParams().product.replaceAll('-', ' ');
    const { imageUrl, loadingImageUrl, product, formattedPrice, orderProduct, deleteProduct, inWishlist, addToWishlist, removeFromWishlist } = useProduct(productName);

    return <div className="product-page">
        {loadingImageUrl && <div className="skeleton product-page-image" style={{height: "300px"}} />}
        {!loadingImageUrl && <img src={imageUrl} alt={productName} className="product-page-image" />}
        <div className="product-info">
            <h2>{productName}</h2>
            {product && <p>Price: {'₦' + formattedPrice}</p>}
            <p>{product && product.description}</p>
            <div className="product-page-buttons">
                <button onClick={orderProduct} style={{ backgroundColor: "hsl(138deg 87.38% 40.39%)" }}><img src="/whatsapp.ico" alt="whatsapp"></img> Order on Whatsapp</button>
                {inWishlist && <button onClick={removeFromWishlist} className="add-to-wishlist"><span className="material-icons" style={{ color: "hsl(0, 100%, 35%)" }}>heart_broken</span> Remove from wishlist</button>}
                {!inWishlist && <button onClick={addToWishlist} className="add-to-wishlist"><span className="material-icons">favorite</span> Add to wishlist</button>}
                {userDetails && userDetails.role === "admin" &&
                    <button onClick={deleteProduct} style={{ backgroundColor: "hsl(0, 0%, 25%)" }}>
                        <span className="material-icons">delete_forever</span>Remove Product
                    </button>}
            </div>
        </div>
    </div >
}