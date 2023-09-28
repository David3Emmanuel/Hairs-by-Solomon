import { Link } from "react-router-dom";
import "./Product.css";
import { useEffect, useState } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

export default function Product({ name, price }) {
    let formattedName = name.replaceAll(' ', '-');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const imageRef = storageRef(storage, `products/${name}`);
        getDownloadURL(imageRef).then(setImageUrl);
    }, [name]);

    return <Link className="product" to={`/product/${formattedName}`}>
        <p className="price">{price ? '₦' + price.toString().split(/(?=(?:\d{3})+$)/).join(",") : "Free"}</p>
        <div className="product-image">
            <img src={imageUrl} alt={name} />
        </div>
        <div className="title-box">
            <p>{name}</p>
        </div>
    </Link>
}