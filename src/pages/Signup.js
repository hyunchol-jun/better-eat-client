import { useState } from "react";
import {requestSignup} from "../utils/http-helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LabeledInput from "../components/LabeledInput";
import Message from "../components/Message";
import Button from "../components/Button";

const StyledMain = styled.main`
    margin: 0 1rem;
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
                <LabeledInput labelText="Email" type="text" name="email" autoComplete="username"/>
                <LabeledInput labelText="Password" type="password" name="password" autoComplete="new-password"/>
                <LabeledInput labelText="Confirm password" type="password" name="confirmPassword" autoComplete="new-password"/>
                <Button buttonText={"Sign up"}></Button>
                {errorMessage && <Message message={errorMessage} isSuccess={isSuccess}></Message>}
            </StyledForm>
        </StyledMain>
    );
};

export default Signup;