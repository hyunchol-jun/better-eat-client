import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import { requestLogin } from "../utils/http-helper";

function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("token");
    }, []);


    const handleLogin = (event) => {
        event.preventDefault();

        const formValues = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        requestLogin(formValues, (response) => {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        })
    }

    return (
        <main>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email: 
                    <input type="text" name="email" autoComplete="username"/>
                </label>
                <label>
                    Password: 
                    <input type="password" name="password" autoComplete="current-password"/>
                </label>
                <button>Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <span>Don't have an account? </span>
            <Link to="/signup" >Sign up</Link>
        </main>
    );
};

export default Login;