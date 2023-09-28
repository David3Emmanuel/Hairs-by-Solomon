import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useReducer, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function useLogin(validationFunctions) {
    const navigate = useNavigate();
    const [applyValidation, setApplyValidation] = useState(false);
    const [loginError, setLoginError] = useState(null);

    function reducer(state, action) {
        if (action.type === "NAME") return { ...state, name: action.value };
        if (action.type === "EMAIL") return { ...state, email: action.value };
        if (action.type === "PASSWORD") return { ...state, password: action.value };
        setLoginError(null);
        return state;
    }
    const [loginDetails, dispatch] = useReducer(reducer, {
        name: "",
        email: "",
        password: ""
    });

    function submit(e, signIn) {
        e.preventDefault();
        // Validation
        setLoginError("");
        setApplyValidation(true);
        let valid = true;
        Object.entries(validationFunctions).forEach(([key, validate]) => {
            const value = loginDetails[key];
            valid &&= validate(value) === "";
        });
        if (valid) {
            // Sign In
            if (signIn) {
                signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
                    .then(() => navigate('/shop'))
                    .catch(setLoginError);
            } else {
                // Sign Up
                createUserWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        // Save user
                        const uid = user.uid;
                        const newUserRef = ref(db, "users/" + uid);
                        set(newUserRef, {
                            name: loginDetails.name,
                            email: loginDetails.email,
                            role: "user",
                            wishlist: []
                        });
                        // Redirect
                        navigate('/shop');
                    })
                    .catch(setLoginError);
            }
        }
    }

    return { loginDetails, dispatch, submit, applyValidation, loginError };
}