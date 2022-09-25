import styled from "styled-components";

const StyledButton = styled.button`
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    color: white;
`;

function Button({buttonText}) {
    return (
        <StyledButton>{buttonText}</StyledButton>
    );
}

export default Button;