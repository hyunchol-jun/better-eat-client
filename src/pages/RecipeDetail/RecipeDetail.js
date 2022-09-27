import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { appendRecipeToUser, getRecipeDetail,appendGroceryItemToUser, getUserRecipeDetail } from "../../utils/http-helper";
import parse from "html-react-parser";
import "./RecipeDetail.scss";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button";
import NotFound from "../../components/NotFound/NotFound";

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
    background-color: var(--outline-color);
    border-radius: 0.25rem;
    padding: 1rem;
    gap: 1rem;
`;

const SubTitle = styled.h2`
    margin: 0;
    font-size: 1rem;
    color: var(--primary-color);
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
    margin: 0;
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

    const location = useLocation();

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
            extendedIngredients: JSON.stringify(ingredients)
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
    const [notFound, setNotFound] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (location.pathname.includes("/users/recipes/")) {
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            };
            getUserRecipeDetail(params.recipeId, headers, (response) => {
                setRecipe(response.data);
            }, (error) => {
                if (error.response.status === 404) {
                    setNotFound(true);
                    console.log(location.pathname)
                }
            })
        } else {
            getRecipeDetail(params.recipeId, (response) => {
                setRecipe(response.data);
            }, (error) => {
                if (error.response.status === 404) {
                    setNotFound(true);
                }
            });
        }

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

    if (notFound) {
        return <
            NotFound />
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
                    {parse(recipe.instructions)}
                </StyledDiv>
                <Button onClick={handleSaveRecipe} buttonText={"Save Recipe"}></Button>
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;