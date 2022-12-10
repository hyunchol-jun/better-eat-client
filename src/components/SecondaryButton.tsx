import styled from "styled-components";

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  color: white;
  flex-shrink: 0;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
  }
`;

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
function SecondaryButton({ children, onClick }: SecondaryButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default SecondaryButton;
