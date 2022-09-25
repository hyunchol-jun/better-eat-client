import styled from "styled-components";

const StyledLabel = styled.label`
    font-weight: 600;
`;

const StyledInput = styled.input`
    width: 100%;
    border-radius: 0.5rem;
    border: 1.5px solid #cccccc;
    padding: 0.5rem 1rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border: 1.5px solid var(--primary-color);
    }
`;

function LabeledInput({labelText, type, name, autoComplete}) {
    return(
        <StyledLabel>
            {labelText}
            <StyledInput type={type} name={name} autoComplete={autoComplete}/>
        </StyledLabel>
    );
}

export default LabeledInput;