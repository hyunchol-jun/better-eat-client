import styled from "styled-components";
import MessageWithoutBorder from "./MessageWithoutBorder";

const StyledMessageContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const StyledIcon = styled.img`
    width: 1.5rem;
`;

function MessageWithIcon({iconSrc, isSuccess, children}) {
    return (
        <StyledMessageContainer>
            <StyledIcon src={iconSrc} alt=""></StyledIcon>
            <MessageWithoutBorder isSuccess={isSuccess}>
                {children}
            </MessageWithoutBorder>
        </StyledMessageContainer>
    );
};

export default MessageWithIcon;