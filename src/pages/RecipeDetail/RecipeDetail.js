import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { appendRecipeToUser, getRecipeDetail,appendGroceryItemToUser, getUserRecipeDetail, removeUserRecipe } from "../../utils/http-helper";
import parse from "html-react-parser";
import "./RecipeDetail.scss";
import Loading from "../../components/Loading/Loading";
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

const StyledTooltip = styled.span`
    font-size: 0.8rem;
    color: ${props => props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
    border: 1px solid ${props => props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"};
    border-radius: 0.25rem;
    margin: 0;
    padding: 0.25rem 0.5rem;
    background-color: white;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom :100%;

    &:after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -0.5rem;
        border-width: 0.5rem;
        border-style: solid;
        border-color: ${props => props.isSuccess ? "var(--secondary-color)" : "var(--warning-color)"} transparent transparent transparent;
    }
`;

const BiggerStyledTooltip = styled(StyledTooltip)`
    font-size: 1rem;
    border-radius: 0.5rem;
    border-width: 2px;
    
    &:after {
        margin-left: -1rem;
        border-width: 1rem;
    }
`;

const StyledButton = styled.button`
    position: relative;
`;

const BiggerStyledButton = styled(StyledButton)`
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
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

    const [recipe, setRecipe] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [messagesArray, setMessagesArray] = useState([]);

    const params = useParams();


    const location = useLocation();

    const handleDeleteRecipe = () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        removeUserRecipe(params.recipeId, headers, (response) => {
            if (response.data > 0) {
                setIsSuccess(true);
                setMessage("Recipe deleted");
            } else {
                setIsSuccess(false);
                setMessage("Already deleted");
            }
            setTimeout(() => {setMessage("")}, 1000);
        }, (error) => {
            setIsSuccess(false);
            setMessage(error.response.data.message);
            setTimeout(() => {setMessage("")}, 1000);
        });
    };

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
            setIsSuccess(true);
            setMessage("Saved to My Recipes");
            setTimeout(() => {setMessage("")}, 1000);
        }, (error) => {
            setIsSuccess(false);
            setMessage(error.response.data.message);
            setTimeout(() => {setMessage("")}, 1000);
        });
    };

    const handleSaveIngredient = (ingredient, index) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        appendGroceryItemToUser({itemName: ingredient}, headers, (response) => {
            setIsSuccess(true);
            const copiedMessagesArray = [...messagesArray];
            copiedMessagesArray[index] = "Saved!";
            setMessagesArray(copiedMessagesArray);
            setTimeout(() => {setMessagesArray([])}, 1000);
        }, (error) => {
            setIsSuccess(false);
            const copiedMessagesArray = [...messagesArray];
            copiedMessagesArray[index] = error.response.data.message;
            setMessagesArray(copiedMessagesArray);
            setTimeout(() => {setMessagesArray([])}, 1000);
        });

    }

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
        return <NotFound />
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
                                    <StyledButton 
                                        onClick={() => handleSaveIngredient(ingredient.name, index)}>
                                        {ingredient.original}
                                        {messagesArray[index] && <StyledTooltip isSuccess={isSuccess}>{messagesArray[index]}</StyledTooltip>}
                                    </StyledButton>
                                </li>
                            )
                        }
                    </StyledList>
                </StyledDiv>
                <StyledDiv>
                    <SubTitle>Instructions</SubTitle>
                    {parse(recipe.instructions)}
                </StyledDiv>
                <BiggerStyledButton 
                    onClick={location.pathname.includes("/users/recipes/") ? handleDeleteRecipe : handleSaveRecipe} >
                    {location.pathname.includes("/users/recipes/") ? "Delete Recipe" : "Save Recipe"}
                    {message && <BiggerStyledTooltip isSuccess={isSuccess}>{message}</BiggerStyledTooltip>}
                </BiggerStyledButton>
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;