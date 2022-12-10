import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: 600;
  width: 100%;
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

  @media (min-width: 768px) {
    font-size: 1.25rem;
    border-radius: 0.75rem;
    padding: 0.75rem 1.5rem;
  }
`;

interface LabeledInputProps {
  labelText: string;
  type: string;
  name: string;
  autoComplete: string;
}

function LabeledInput({
  labelText,
  type,
  name,
  autoComplete,
}: LabeledInputProps) {
  return (
    <StyledLabel>
      {labelText}
      <StyledInput type={type} name={name} autoComplete={autoComplete} />
    </StyledLabel>
  );
}

export default LabeledInput;
