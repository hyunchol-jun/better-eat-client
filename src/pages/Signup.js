import { useState } from "react";
import {requestSignup} from "../utils/http-helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LabeledInput from "../components/LabeledInput";
import Message from "../components/Message";
import Button from "../components/Button";

const StyledMain = styled.main`
    margin: 0 1rem;
    min-height: calc(100vh - 7rem);

    @media (min-width: 768px) {
        margin: 2rem 2rem 2rem 14rem;
    }

    @media (min-width: 1280px) {
        max-width: 52rem;
        margin: 3rem auto 3rem;
    }
`;

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

function Signup() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
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
            setIsSuccess(false);
            setErrorMessage("Passwords don't match.");
            return;
        }

        if (formValues.password.length < 8) {
            setIsSuccess(false);
            setErrorMessage("Password must be longer than 7 characters.");
            return;
        }

        requestSignup(formValues, () => {
            setIsSuccess(true);
            setErrorMessage("Successfully signed up!");
            setTimeout(() => navigate("/login"), 1000);
        }, (error) => {
            setIsSuccess(false);
            setErrorMessage(error.response.data.message);
        });
    };

    return (
        <StyledMain>
            <h1>Sign Up</h1>
            <StyledForm onSubmit={handleSignup}>
                <LabeledInput labelText="Name" type="text" name="name" />
                <LabeledInput labelText="Email" type="email" name="email" autoComplete="username"/>
                <LabeledInput labelText="Password" type="password" name="password" autoComplete="new-password"/>
                <LabeledInput labelText="Confirm password" type="password" name="confirmPassword" autoComplete="new-password"/>
                <StyledButton buttonText={"Sign up"}></StyledButton>
                {errorMessage && <Message message={errorMessage} isSuccess={isSuccess}></Message>}
            </StyledForm>
        </StyledMain>
    );
};

export default Signup;