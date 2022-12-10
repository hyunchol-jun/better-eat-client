import styled from "styled-components";
import Message from "./Message";

const StyledMessageWithoutBorder = styled(Message)`
  border: none;
  background-color: transparent;
`;

interface MessageWithoutBorderProps {
  children: React.ReactNode;
  isSuccess: boolean;
  className?: string;
}

function MessageWithoutBorder({
  children,
  isSuccess,
  className,
}: MessageWithoutBorderProps) {
  return (
    <StyledMessageWithoutBorder isSuccess={isSuccess} className={className}>
      {children}
    </StyledMessageWithoutBorder>
  );
}

export default MessageWithoutBorder;
