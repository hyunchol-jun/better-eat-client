import styled from "styled-components";

interface StyledMessageProps {
  isSuccess: boolean;
}

const StyledMessage = styled.p<StyledMessageProps>`
  font-size: 1rem;
  color: ${(props) =>
    props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
  border: 1.5px solid
    ${(props) =>
      props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
  border-radius: 0.5rem;
  margin: 0;
  padding: 0.5rem 1rem;
  background-color: white;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

interface MessageProps {
  children: React.ReactNode;
  isSuccess: boolean;
  className?: string;
}

function Message({ children, isSuccess, className }: MessageProps) {
  return (
    <StyledMessage isSuccess={isSuccess} className={className}>
      {children}
    </StyledMessage>
  );
}

export default Message;
