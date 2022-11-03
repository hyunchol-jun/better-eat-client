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
    z-index: 1;
    left: -13rem;
    bottom :100%;
    width: 15rem;

    @media (min-width: 768px) {
        left: -26.5rem;
        width: 30rem;
    }

    @media (min-width: 1280px) {
        left: -35rem;
        width: 40rem;
    }

    &:after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 92%;
        margin-left: -0.5rem;
        border-width: 0.5rem;
        border-style: solid;
        border-color: var(--secondary-text-color) transparent transparent transparent;

        @media (min-width: 768px) {
            left: 91%;
        }

        @media (min-width: 768px) {
            left: 89.5%;
        }
    }
`;

function Tooltip({children, id}) {
    return (
        <StyledTooltip id={id}>{children}</StyledTooltip>
    );
}

export default Tooltip;