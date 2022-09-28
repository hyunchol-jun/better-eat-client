import styled from "styled-components";
import Button from "./Button";

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
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

function SimpleForm({handleSubmit, buttonText}) {
    return (
        <section>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput type="text" name="textInput" required/>
                <Button buttonText={buttonText}></Button>
            </StyledForm>
        </section>
    );
}

export default SimpleForm;