import { createContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    // Users
    const [userDetails, setUserDetails] = useState(null);
    const [loadingUserDetails, setLoadingUserDetails] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                const userRef = ref(db, "users/" + uid);
                onValue(userRef, snapshot => {
                    const data = snapshot.val();
                    setUserDetails({ ...data, uid });
                    setLoadingUserDetails(false);
                })
            } else {
                setUserDetails(null);
                setLoadingUserDetails(false);
            }
        })
    }, []);

    // Products
    const [products, setProducts] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
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
            setLoadingProducts(false);
        })
    }, []);

    // Wishlist
    const [wishlist, setWishlist] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(true);
    useEffect(() => {
        if (!userDetails) {
            setWishlist([]);
            return;
        }

        const wishlistRef = ref(db, `wishlist/${userDetails.uid}`);
        onValue(wishlistRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                setWishlist(Object.keys(data).filter(productName => data[productName]));
            } else {
                setWishlist([]);
            }
            setLoadingWishlist(false);
        })
    }, [userDetails])

    return <GlobalContext.Provider value={{ userDetails, loadingUserDetails, products, loadingProducts, wishlist, loadingWishlist }}>
        {children}
    </GlobalContext.Provider>
}