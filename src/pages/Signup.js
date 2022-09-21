import { useState } from "react";
import {requestSignup, requiestSignup} from "../utils/http-helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();

        const formValues = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        };
        
        if (formValues.password !== formValues.confirmPassword) {
            setErrorMessage("Passwords don't match.");
            return;
        }

        if (formValues.password.length < 8) {
            setErrorMessage("Password must be longer than 7 characters.");
            return;
        }

        requestSignup(formValues, () => {
            setErrorMessage("Successfully signed up!");
            setTimeout(() => navigate("/login"), 1000);
        });
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label>
                    Name: 
                    <input type="text" name="name" />
                </label>
                <label>
                    Email: 
                    <input type="text" name="email" autoComplete="username"/>
                </label>
                <label>
                    Password: 
                    <input type="password" name="password" autoComplete="new-password"/>
                </label>
                <label>
                    Confirm password: 
                    <input type="password" name="confirmPassword" autoComplete="new-password"/>
                </label>
                {errorMessage && <p>{errorMessage}</p>}
                <button>Sign up</button>
            </form>
        </main>
    );
};

export default Signup;