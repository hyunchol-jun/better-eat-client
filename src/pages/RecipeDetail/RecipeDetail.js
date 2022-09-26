import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { appendRecipeToUser, getRecipeDetail,appendGroceryItemToUser } from "../../utils/http-helper";
import parse from "html-react-parser";
import "./RecipeDetail.scss";
import Loading from "../../components/Loading/Loading";

const PageMain = styled.main`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
`;

const ImageDiv = styled.div`
    width: 100%;
`;

const RecipeImage = styled.img`
    width: 100%;
    object-fit: contain;
`;

const StyledSection = styled.section`
    padding: 1rem;
    background-color: white;
    position: relative;
    margin-top: -1rem;
    border-radius: 1rem 1rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Title = styled.h1`
    margin: 0;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--outline-color);
    border-radius: 0.25rem;
`;

const SubTitle = styled.h2`
    font-size: 1rem;
    color: var(--secondary-color);
`;

const BackButton = styled(IconButton)`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

const StyledList = styled.ul`
    list-style: none;
`;

const StyledPara = styled.p`

`;

function RecipeDetail() {
    const navigate = useNavigate();

    // Check if logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

    const handleSaveRecipe = () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        const ingredients = recipe.extendedIngredients.map(ingredient => {
            return {
                id: ingredient.id,
                name: ingredient.name,
                original: ingredient.original
            };
        })

        const body = {
            id: recipe.id,
            title: recipe.title,
            diets: JSON.stringify(recipe.diets),
            cuisines: JSON.stringify(recipe.cuisines),
            instructions: recipe.instructions,
            image: recipe.image,
            ready_min: recipe.readyInMinutes,
            ingredients: JSON.stringify(ingredients)
        };

        appendRecipeToUser(body, headers, (response) => {
            console.log(response.data);
        })
    };

    const handleSaveIngredient = (ingredient) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        appendGroceryItemToUser({itemName: ingredient}, headers, (response) => {
            console.log(response.data);
        })

    }

    const [recipe, setRecipe] = useState(null);
    const params = useParams();

    useEffect(() => {
        getRecipeDetail(params.recipeId, (response) => {
            setRecipe(response.data);
        })
        window.scrollTo(0, 0);
    }, []);

    const inventoryItemsFromStorage = localStorage.getItem("inventoryList");
    const inventoryItemsArray = inventoryItemsFromStorage 
                                ? JSON.parse(inventoryItemsFromStorage) 
                                : [];

    const returnClassNameIfNameInArray = (name, array, className) => {
        const foundName = array.find(element => element.toLowerCase() === name.toLowerCase());
        return foundName ? className : "";
    }

    if (!recipe) {
        return <Loading/>;
    }

    return (
        <PageMain>
            <ImageDiv>
                <RecipeImage src={recipe.image} alt="food"></RecipeImage>
                <BackButton 
                    imgSrc={arrowBackIcon} 
                    altText="go back" 
                    handleClick={() => navigate(-1)}
                ></BackButton>
            </ImageDiv>
            <StyledSection>
                <Title>{recipe.title}</Title>
                {recipe.diets.length > 0 && <StyledDiv>
                    <SubTitle>Diets</SubTitle>
                    <StyledList>
                        {recipe.diets.map((label, index) => <li key={index}>{label}</li>)}
                    </StyledList>
                </StyledDiv>}
                {recipe.cuisines.length > 0 && <StyledDiv>
                    <SubTitle>Cuisines</SubTitle>
                    <StyledList>
                        {recipe.cuisines.map((type, index) => <li key={index}>{type}</li>)}
                    </StyledList>
                </StyledDiv>}
                <StyledDiv>
                    <SubTitle>Ingredients</SubTitle>
                    <StyledList>
                        {recipe.extendedIngredients.map((ingredient, index) => 
                                <li 
                                    key={index} 
                                    className={returnClassNameIfNameInArray(ingredient.name, inventoryItemsArray, "ingredient-item--in-inventory")}
                                >
                                    <button 
                                        onClick={() => handleSaveIngredient(ingredient.name)}>
                                        {ingredient.original}
                                    </button>
                                </li>
                            )
                        }
                    </StyledList>
                </StyledDiv>
                <StyledDiv>
                    <SubTitle>Instructions</SubTitle>
                    <StyledPara>
                        {parse(recipe.instructions)}
                    </StyledPara>
                </StyledDiv>
                <button onClick={handleSaveRecipe}>Save Recipe</button>
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;