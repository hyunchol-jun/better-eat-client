import { useEffect, useState } from "react";
import { getAllUserRecipes } from "../utils/http-helper";
import { useNavigate } from "react-router-dom";
import RecipesList from "../components/RecipesList/RecipesList";
import styled from "styled-components";
import Message from "../components/Message";

const StyledMain = styled.main`
    margin: 0 1rem;
    min-height: calc(100vh - 7rem);
`;

const MessageWithoutBorder = styled(Message)`
    border: none;
`;

function MyRecipes() {

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

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
            <h1>My Recipes</h1>
            {recipes && recipes.length === 0 
                ? <MessageWithoutBorder 
                    message={"You have no recipes saved."} 
                    isSuccess={true}>
                  </MessageWithoutBorder>
                : <RecipesList recipes={recipes} to={"/users/recipes/"}/>
            }
        </StyledMain>
    );
}

export default MyRecipes;