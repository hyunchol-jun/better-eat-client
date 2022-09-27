import styled from "styled-components";

const StyledFooter = styled.footer`
    width: 100%;
    color: var(--secondary-color);
    background-color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
`;

const StyledA = styled.a`
    color: var(--secondary-color);
`;

function PageFooter() {
    return (
        <StyledFooter>
            <span>Powered by&nbsp;</span>
            <StyledA href="http://spoonacular.com/food-api">spoonacular API</StyledA>
        </StyledFooter>
    );
}

export default PageFooter;