import styled from "styled-components";

const StyledLabel = styled.label`
    display: flex;
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-decoration: ${props => props.checked ? "line-through" : "none"};
    color: ${props => props.checked ? "var(--secondary-text-color)" : "inherit"};

    @media (min-width: 768px) {
        font-size: 1.25rem;
        padding-left: 2.5rem;
    }

    @media (min-width: 1280px) {
        font-size: 1.5rem;
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:hover ~ .checkmark {
            background-color: var(--secondary-text-color);
        }
    
        &:checked ~ .checkmark {
            background-color: var(--primary-color);
        
            &:after {
                display: block;
            }
        }
    }
`;

const StyledCheckmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 1.25rem;
    width: 1.25rem;
    background-color: var(--outline-color);
    border-radius: 3px;

    @media (min-width: 768px) {
        top: 0.15rem;
        height: 1.5rem;
        width: 1.5rem;
    }

    &:after {
        content: "";
        position: absolute;
        display: none;
    
        left: 0.5rem;
        top: 0.25rem;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);

        @media (min-width: 768px) {
            width: 7.5px;
            height: 12.5px;
        }
    }
`;

function CheckBox({children, checked, onChange}) {
    return (
        <StyledLabel checked={checked}>
            {children}
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <StyledCheckmark className="checkmark"></StyledCheckmark>
        </StyledLabel>
    );
}

export default CheckBox;