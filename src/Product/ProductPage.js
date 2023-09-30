import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, update, remove } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { GlobalContext } from "../utils/globalStates";
import "./ProductPage.css";

export default function ProductPage() {
    const { userDetails, products, wishlist } = useContext(GlobalContext);
    const productName = useParams().product.replaceAll('-', ' ');
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const imageRef = storageRef(storage, `products/${productName}`);
        getDownloadURL(imageRef).then(setImageUrl);
    }, [productName]);

    // const products = useShop();
    const [product, setProduct] = useState(null);
    const [formattedPrice, setFormattedPrice] = useState("");
    useEffect(() => {
        if (products) setProduct(products.find(prod => prod.name === productName));
    }, [productName, products]);
    useEffect(() => {
        if (product) setFormattedPrice(product.price.toString().split(/(?=(?:\d{3})+$)/).join(","));
    }, [product])

    // Wishlist
    const [inWishlist, setInWishlist] = useState(false);
    useEffect(() => {
        setInWishlist(wishlist.includes(productName));
    }, [productName, wishlist]);

    function addToWishlist() {
        if (inWishlist) return console.log("Already in wishlist");

        const wishlistRef = ref(db, `wishlist/${userDetails.uid}`);
        const updateObj = {};
        updateObj[productName] = true;
        update(wishlistRef, updateObj)
            .then(() => console.log("Success"))
            .catch(error => console.log("Error", error));
    }


    function removeFromWishlist() {
        if (userDetails) {
            if (!inWishlist) return console.log("Not in wishlist");

            const wishlistRef = ref(db, `wishlist/${userDetails.uid}`);
            remove(wishlistRef)
                .then(() => console.log("Success"))
                .catch(error => console.log("Error", error));
        }
    }

    function orderProduct() {
        if (userDetails) {
            const message = encodeURI(`Hello, my name is ${userDetails.name}. I'd like to order *${productName} (${formattedPrice} naira)*\n\n${window.location.href}`)
            window.open(`https://wa.me/2347039669253?text=${message}`);
            // window.open(`https://wa.me/2347012117811?text=${message}`);
        } else {
            navigate("/login");
        }
    }

    function deleteProduct() {
        const productRef = ref(db, "products/" + product.id);
        remove(productRef)
            .then(() => navigate("/shop"));
    }

    return <div className="product-page">
        <img src={imageUrl} alt={productName} className="product-page-image" />
        <div className="product-info">
            <h2>{productName}</h2>
            {product && <p>Price: {'₦' + formattedPrice}</p>}
            <div className="product-page-buttons">
                <button onClick={orderProduct} style={{ backgroundColor: "hsl(138deg 87.38% 40.39%)" }}><img src="/whatsapp.ico" alt="whatsapp"></img> Order on Whatsapp</button>
                {inWishlist && <button onClick={removeFromWishlist} className="add-to-wishlist"><span className="material-icons" style={{ color: "hsl(0, 100%, 35%)" }}>heart_broken</span> Remove from wishlist</button>}
                {!inWishlist && <button onClick={addToWishlist} className="add-to-wishlist"><span className="material-icons">favorite</span> Add to wishlist</button>}
                {userDetails && userDetails.role === "admin" &&
                    <button onClick={deleteProduct} style={{ backgroundColor: "hsl(0, 0%, 25%)" }}>
                        <span className="material-icons">delete_forever</span>Remove Product
                    </button>}
            </div>
            <p>{product && product.description}</p>
        </div>
    </div >
}