import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../utils/firebase";

export default function useShop() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const productsRef = ref(db, "products");
        onValue(productsRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                setProducts(Object.entries(data).map(([id, product]) => {
                    return { ...product, id };
                }));
            } else {
                setProducts(null);
            }
        })
    }, []);

    return products;
}