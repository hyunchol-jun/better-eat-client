import styled from "styled-components";

const StyledMessage = styled.p`
    font-size: 1rem;
    color: ${props => props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
    border: 1.5px solid ${props => props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
    border-radius: 0.5rem;
    margin: 0;
    padding: 0.5rem 1rem;
    background-color: white;
`;


function Message ({message, isSuccess}){
    return (
        <StyledMessage isSuccess={isSuccess}>
            {message}
        </StyledMessage>
    );
}

export default Message;