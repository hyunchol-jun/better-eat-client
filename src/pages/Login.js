import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import { requestLogin } from "../utils/http-helper";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import Message from "../components/Message";

const StyledMain = styled.main`
    margin: 0 1rem;
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function Login() {
    const [isSuccess, setIsSuccess] = useState(false);
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
            setIsSuccess(true);
            setErrorMessage("Successfully logged in!");
            localStorage.setItem("token", response.data.token);
            setTimeout(() => navigate("/"), 1000);
        }, (error) => {
            setIsSuccess(false);
            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <StyledMain>
            <h1>Log in</h1>
            <StyledForm onSubmit={handleLogin}>
                <LabeledInput 
                    labelText="Email" 
                    type="email" 
                    name="email" 
                    autoComplete="username"
                />
                <LabeledInput 
                    labelText="Password" 
                    type="password" 
                    name="password" 
                    autoComplete="current-password"
                />
                <Button buttonText={"Login"}></Button>
                <span>
                    Don't have an account? &nbsp;
                    <Link to="/signup" >Sign up</Link>
                </span>
                {errorMessage && <Message message={errorMessage} isSuccess={isSuccess}></Message>}
            </StyledForm>
        </StyledMain>
    );
};

export default Login;