import { useReducer, useState } from "react";
import { push, ref, set } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function useNewProduct(originalProduct) {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    function reducer(state, action) {
        if (action.type === "NAME") return { ...state, name: action.value.replaceAll('-', '') };
        if (action.type === "PRICE") {
            let price = action.value;
            price = price.replaceAll(/[^\d]/g, '')
            price = parseInt(price)
            if (price) {
                price = '₦' + price.toString().split(/(?=(?:\d{3})+$)/).join(",");
                return { ...state, price };
            }
            return { ...state, price: "" };
        }
        if (action.type === "DESCRIPTION") return { ...state, description: action.value };
        return state;
    }
    const [product, dispatch] = useReducer(reducer, originalProduct || {
        name: "",
        price: "",
        description: ""
    })

    function submit(e) {
        e.preventDefault();
        // Save Details
        const productsRef = ref(db, "products");
        const newProductRef = push(productsRef);
        set(newProductRef, {
            ...product,
            date: Date.now(),
            price: parseInt(product.price.replaceAll(/[^\d]/g, ''))
        });
        // Save Image
        const imageRef = storageRef(storage, `products/${product.name}`);
        uploadBytes(imageRef, image).then(snapshot => {
            console.log(snapshot);
        })
        // Redirect
        navigate('/shop');
    }

    function handleImage(e) {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    return { product, dispatch, submit, handleImage, imageUrl }
}