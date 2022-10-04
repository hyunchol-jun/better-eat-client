import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import { requestLogin } from "../utils/http-helper";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import Message from "../components/Message";
import PageMain from "../components/PageMain";

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 2rem;
        align-items: flex-end;
    }
`;

const StyledButton = styled(Button)`
    @media (min-width: 768px) {
        width: fit-content;
        padding: 0.75rem 2.5rem;
    }

    @media (min-width: 1280px) {
        width: fit-content;
        padding: 1rem 4rem;
    }
`;

const StyledSpan = styled.span`
    width: 100%;
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
        <PageMain>
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
                {errorMessage && <Message isSuccess={isSuccess}>{errorMessage}</Message>}
                <StyledButton buttonText={"Login"}></StyledButton>
                <StyledSpan>
                    Don't have an account? &nbsp;
                    <Link to="/signup" >Sign up</Link>
                </StyledSpan>
            </StyledForm>
        </PageMain>
    );
};

export default Login;