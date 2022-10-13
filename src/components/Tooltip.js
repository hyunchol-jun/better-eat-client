import styled from "styled-components";

const StyledTooltip = styled.span`
    visibility: hidden;
    font-size: 1rem;
    font-weight: 400;
    color: white;
    border: none;
    border-radius: 0.25rem;
    margin: 0;
    padding: 0.25rem 0.5rem;
    background-color: var(--secondary-text-color);
    position: absolute;
    z-index: 2;
    left: 0;
    bottom :100%;
    width: 15rem;

    @media (min-width: 768px) {
        left: -3rem;
        width: 30rem;
    }

    @media (min-width: 1280px) {
        width: 40rem;
    }

    &:after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 10%;
        margin-left: -0.5rem;
        border-width: 0.5rem;
        border-style: solid;
        border-color: var(--secondary-text-color) transparent transparent transparent;

        @media (min-width: 768px) {
            left: 20%;
        }
    }
`;

function Tooltip({children, id}) {
    return (
        <StyledTooltip id={id}>{children}</StyledTooltip>
    );
}

export default Tooltip;