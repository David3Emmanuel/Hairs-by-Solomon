import { Link } from "react-router-dom";
import "./Product.css";
import { useEffect, useState, useContext } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import { GlobalContext } from "../utils/globalStates";

export default function Product({ name, _price }) {
    let formattedName = name.replaceAll(' ', '-');
    const { products } = useContext(GlobalContext);

    // Product Image
    const [imageUrl, setImageUrl] = useState('');
    const [loadingImageUrl, setLoadingImageUrl] = useState(true);
    useEffect(() => {
        const imageRef = storageRef(storage, `products/${name}`);
        getDownloadURL(imageRef)
            .then(setImageUrl)
            .finally(() => setLoadingImageUrl(false));
    }, [name]);

    // Product price
    const [price, setPrice] = useState(_price || 0);
    useEffect(() => {
        if (products) {
            const product = products.find(prod => prod.name === name);
            if (product) setPrice(product.price);
        }
    }, [products, name]);

    return <Link className="product" to={`/product/${formattedName}`}>
        <p className="price">{price ? '₦' + price.toString().split(/(?=(?:\d{3})+$)/).join(",") : "Free"}</p>
        <div className="product-image">
            {loadingImageUrl && <div style={{borderRadius: "inherit"}} className="skeleton" />}
            {!loadingImageUrl && <img src={imageUrl} alt={name} />}
        </div>
        <div className="title-box">
            <p>{name}</p>
        </div>
        <div className="product__hover-overlay">View Product</div>
    </Link>
}