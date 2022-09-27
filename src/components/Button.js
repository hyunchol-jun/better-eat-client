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
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: var(--primary-tonned-down-color);
    }
`;

function Button({buttonText, as, to, onClick, tooltip}) {
    return (
        <StyledButton as={as} to={to} onClick={onClick}>{buttonText} {tooltip}</StyledButton>
    );
}

export default Button;