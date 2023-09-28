import { createContext, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
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

    return <GlobalContext.Provider value={{ userDetails }}>
        {children}
    </GlobalContext.Provider>
}