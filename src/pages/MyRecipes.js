import { useEffect, useState } from "react";
import { getAllUserRecipes } from "../utils/http-helper";
import { useNavigate } from "react-router-dom";
import RecipesList from "../components/RecipesList/RecipesList";
import styled from "styled-components";
import MessageWithoutBorder from "../components/MessageWithoutBorder";
import checkIcon from "../assets/icons/check.svg";
import PageMain from "../components/PageMain";

const StyledMain = styled(PageMain)`
    margin: 0 1rem 1rem;

    @media (min-width: 768px) {
        margin: 0 2rem 1rem 14rem;
    }

    @media (min-width: 1280px) {
        max-width: 64rem;
        margin: 3rem auto;
    }
`;

const StyledTitle = styled.h1`
    @media (min-width: 768px) {
        display: none;
    }
`;

const StyledMessageContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledIcon = styled.img`
    width: 1.5rem;
`;

function MyRecipes() {

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        getAllUserRecipes(headers, (response) => {
            setRecipes(response.data);
        })
    }, []);

    return (
        <StyledMain>
            <StyledTitle>My Recipes</StyledTitle>
            {recipes && recipes.length === 0 
                ? <StyledMessageContainer>
                    <StyledIcon src={checkIcon} alt=""></StyledIcon>
                    <MessageWithoutBorder 
                        isSuccess={true}>
                        You have no recipes saved.
                    </MessageWithoutBorder>
                </StyledMessageContainer>
                : <RecipesList recipes={recipes} to={"/users/recipes/"}/>
            }
        </StyledMain>
    );
}

export default MyRecipes;