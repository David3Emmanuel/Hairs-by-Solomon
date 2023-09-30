import { createContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    // Users
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                const userRef = ref(db, "users/" + uid);
                onValue(userRef, snapshot => {
                    const data = snapshot.val();
                    setUserDetails({ ...data, uid });
                })
            } else {
                setUserDetails(null);
            }
        })
    }, []);

    // Products
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

    // Wishlist
    const [wishlist, setWishlist] = useState([]);
    console.log("Creating wishlist...");
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
        })
    }, [userDetails])

    return <GlobalContext.Provider value={{ userDetails, products, wishlist }}>
        {children}
    </GlobalContext.Provider>
}