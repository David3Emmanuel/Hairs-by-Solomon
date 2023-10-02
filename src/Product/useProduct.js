import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ref, update, remove } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { GlobalContext } from "../utils/globalStates";

export default function useProduct(productName) {
    const { userDetails, products, wishlist } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');
    const [loadingImageUrl, setLoadingImageUrl] = useState(true);
    useEffect(() => {
        const imageRef = storageRef(storage, `products/${productName}`);
        getDownloadURL(imageRef)
            .then(setImageUrl)
            .finally(() => setLoadingImageUrl(false));;
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

    return { imageUrl, loadingImageUrl, product, formattedPrice, orderProduct, deleteProduct, inWishlist, addToWishlist, removeFromWishlist };
}