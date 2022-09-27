import { useEffect, useState } from "react";
import { getAllUserRecipes } from "../utils/http-helper";
import { useNavigate } from "react-router-dom";
import RecipesList from "../components/RecipesList/RecipesList";
import styled from "styled-components";

const StyledMain = styled.main`
    margin: 0 1rem;
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
            <RecipesList recipes={recipes} to={"/users/recipes/"}/>
        </StyledMain>
    );
}

export default MyRecipes;