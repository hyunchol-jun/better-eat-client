import styled from "styled-components";
import Message from "./Message";

const StyledMessageWithoutBorder = styled(Message)`
    border: none;
    background-color: transparent;
`;

function MessageWithoutBorder({children, isSuccess, className}) {
    return (
        <StyledMessageWithoutBorder isSuccess={isSuccess} className={className}>
            {children}
        </StyledMessageWithoutBorder>
    );
}

export default MessageWithoutBorder;