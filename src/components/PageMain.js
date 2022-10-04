import styled from "styled-components";

const StyledMain = styled.main`
    margin: 0 1rem;
    min-height: calc(100vh - 7rem);

    @media (min-width: 768px) {
        margin: 1rem 2rem 1rem 14rem;
    }

    @media (min-width: 1280px) {
        max-width: 52rem;
        margin: 3rem auto 3rem;
    }
`;

function PageMain({children}) {
    return (
        <StyledMain>
            {children}
        </StyledMain>
    );
}

export default PageMain;