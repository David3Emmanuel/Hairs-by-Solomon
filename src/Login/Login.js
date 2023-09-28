import { useState } from "react";
import "./Login.css";
import useLogin from "./useLogin";



export default function Login() {

    const [signIn, setSignIn] = useState(false);
    const nameValidate = name => {
        if (signIn) return "";
        if (name.length < 3) return "Name must be at least 3 characters long";
        else return "";
    }
    const emailValidate = email => {
        if (email.match(/^[^\s]+@[^\s]+\.[^\s]+$/)) return "";
        else return "Invalid email";
    }
    const passwordValidate = password => {
        if (password.length < 8) return "Password must be at least 8 characters long";
        else if (!password.match(/[a-z]/)) return "Password must contain at least one lowercase letter";
        else if (!password.match(/[A-Z]/)) return "Password must contain at least one upperrcase letter";
        else if (!password.match(/\d/)) return "Password must contain at least one number";
        else return "";
    }
    const { loginDetails, dispatch, submit, applyValidation, loginError } = useLogin({
        name: nameValidate,
        email: emailValidate,
        password: passwordValidate
    });

    return <div className={`login new-product ${applyValidation ? "validate" : ""}`}>
        <img src="/logo-colored2.png" alt="logo" width="100%" />
        <p className="toggle-login-mode">{signIn ? "Don't" : "Already"} have an account? <span onClick={() => setSignIn(prev => !prev)}>Sign {signIn ? "up" : "in"}</span></p>
        {loginError && <p className="login-error-message">{loginError.code.split('/')[1].replaceAll('-', ' ')}</p>}
        <form onSubmit={(e) => submit(e, signIn)}>
            {!signIn && <LoginInput
                name="name" label="Full Name"
                value={loginDetails.name} dispatch={dispatch}
                validate={nameValidate}
            />}
            <LoginInput
                name="email" label="Email"
                value={loginDetails.email} dispatch={dispatch}
                validate={emailValidate}
            />
            <LoginInput
                name="password" label="Password" type="password"
                value={loginDetails.password} dispatch={dispatch}
                validate={passwordValidate}
            />
            <button type="submit">{signIn ? "SIGN IN" : "SIGN UP"}</button>
        </form>
    </div>
}

function LoginInput({ name, label, value, dispatch, validate, ...attr }) {
    const validateError = validate(value);

    return <>
        {validateError !== "" && <p className="validate-error-message">{validateError}</p>}
        <div className={`login-input product-input ${validateError === "" ? "" : "invalid"}`}>
            <p>{label}</p>
            <input className="mobile"
                type="text" name={name} value={value}
                placeholder={label}
                onInput={e => dispatch({ type: name.toUpperCase(), value: e.target.value })}
                {...attr}
            />
            <input className="desktop"
                type="text" name={name} value={value}
                onInput={e => dispatch({ type: name.toUpperCase(), value: e.target.value })}
                {...attr}
            />
        </div>
    </>
}