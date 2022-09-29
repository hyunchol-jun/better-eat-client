import styled from "styled-components";

const StyledButton = styled.button`
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    cursor: pointer;

    @media (min-width: 768px) {
        font-size: 1.25rem;
        padding: 0.5rem 2rem;
    }

    @media (min-width: 1280px) {
        font-size: 1.25rem;
        padding: 0.75rem 4rem;
    }

    &:hover {
        background-color: var(--primary-tonned-down-color);
    }
`;

function Button({buttonText, as, to, onClick, tooltip, className}) {
    return (
        <StyledButton as={as} to={to} onClick={onClick} className={className}>{buttonText} {tooltip}</StyledButton>
    );
}

export default Button;