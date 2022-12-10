import styled from "styled-components";
import Button from "./Button";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }

  @media (min-width: 1280px) {
    gap: 2rem;
    margin: 2rem 0;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  border: 1.5px solid #cccccc;
  padding: 0.5rem 1rem;
  font-family: inherit;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1280px) {
    font-size: 1.25rem;
  }

  &:focus {
    outline: none;
    border: 1.5px solid var(--primary-color);
  }
`;

interface SimpleFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

function SimpleForm({ handleSubmit, buttonText }: SimpleFormProps) {
  return (
    <section>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput type="text" name="textInput" required />
        <Button buttonText={buttonText}></Button>
      </StyledForm>
    </section>
  );
}

export default SimpleForm;
