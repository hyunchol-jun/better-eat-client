import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import dietIcon from "../../assets/icons/diet.svg";
import timeIcon from "../../assets/icons/clock.svg";
import eggIcon from "../../assets/icons/egg.svg";
import cuisineIcon from "../../assets/icons/cuisine.svg";
import instructionsIcon from "../../assets/icons/instructions.svg";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
        appendRecipeToUser, 
        getRecipeDetail,
        appendGroceryItemToUser, 
        getUserRecipeDetail, 
        removeUserRecipe, 
        checkUserRecipe
    } from "../../utils/http-helper";
import parse from "html-react-parser";
import Loading from "../../components/Loading/Loading";
import NotFound from "../../components/NotFound/NotFound";
import Message from "../../components/Message";

const PageMain = styled.main`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    min-height: calc(100vh - 7rem);

    @media (min-width: 768px) {
        position: static;
        margin-left: 13rem;
        width: auto;
    }

    @media (min-width: 1280px) {
        position: static;
        margin: auto;
        max-width: 64rem;
    }
`;

const ImageDiv = styled.div`
    width: 100%;
    position: relative;
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

    @media (min-width: 768px) {
        padding: 2rem;
        align-items: flex-end;
        gap: 2rem;
    }

    @media (min-width: 1280px) {
        padding: 3rem 8rem 3rem;
        align-items: flex-end;
        gap: 2.5rem;
    }
`;

const Title = styled.h1`
    margin: 0;
    width: 100%;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    border-radius: 0.25rem;
    padding: 1rem;
    gap: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        padding: 2rem;
    }

    @media (min-width: 1280px) {
        padding: 2.5rem 3.5rem;
    }
`;

const SubTitleDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const StyledIcon = styled.img`
    width: 1.5rem;
`;

const SubTitle = styled.h2`
    margin: 0;
    font-size: 1rem;
    color: var(--primary-tonned-down-color);
    
    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

const BackButton = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: none;
    border: none;
    flex-shrink: 0;
    padding: 0;
`;

const StyledBackIcon = styled.img`
    width: 3.5rem;

    @media (min-width: 768px) {
        width: 4.5rem;
    }
`;

const StyledList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 768px) {
        font-size: 1.25rem;
        gap: 1rem;
    }

    @media (min-width: 1280px) {
        font-size: 1.5rem;
        gap: 1.5rem;
    }
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    max-width: 80%;
`;

const StyledBadge = styled.span`
    font-size: 0.75rem;
    color: white;
    background-color: var(--secondary-color);
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    position: absolute;
    z-index: 1;
    right: 2rem;

    @media (min-width: 768px) {
        right: 4rem;
        font-size: 1rem;
        border-radius: 1rem;
    }

    @media (min-width: 1280px) {
        right: 11.5rem;
    }
`;

const StyledTooltip = styled.span`
    font-size: 1rem;
    font-weight: bold;
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
    font-size: 1.25rem;
    border-radius: 0.5rem;
    border-width: 2px;
    
    &:after {
        margin-left: -1rem;
        border-width: 1rem;
    }
`;

const StyledButton = styled.button`
    position: relative;
    cursor: pointer;
    border: 0.1rem solid var(--primary-text-color);
    border-radius: 0.5rem;
    padding: 0.35rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    color: var(--primary-text-color);
    text-align: start;

    @media (min-width: 768px) {
        font-size: 1.25rem;
    }
`;

const BiggerStyledButton = styled(StyledButton)`
    font-weight: bold;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${props => props.buttonGreyedOut ? "var(--outline-color)" : props.buttonColor};
    color: white;
    text-align: center;

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        width: fit-content;
    }

    &:hover {
        background-color: ${props => props.buttonGreyedOut ? "var(--outline-color)" :props.buttonHoverColor};
    }
`;

const MessageWithoutBorder = styled(Message)`
    border: none;
    background-color: transparent;
    padding: 0;
`;

function RecipeDetail() {
    const navigate = useNavigate();

    const params = useParams();
    const location = useLocation();

    // Check if logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (!location.pathname.includes("/users/recipes/")) {
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            };

            checkUserRecipe(params.recipeId, headers, (response) => {
                if (response.data.length > 0) {
                    setButtonGreyedOut(true);
                }
            })
        }
    }, [location.pathname, params.recipeId]);

    const [recipe, setRecipe] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [messagesArray, setMessagesArray] = useState([]);
    const [buttonGreyedOut, setButtonGreyedOut] = useState(false);

    const handleDeleteRecipe = () => {
        setButtonGreyedOut(true);

        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        removeUserRecipe(params.recipeId, headers, (response) => {
            setIsSuccess(true);
            setMessage("Recipe deleted");
            setTimeout(() => {
                setMessage("");
                navigate("/recipes");
            }, 1000);
        }, (error) => {
            setButtonGreyedOut(false);
            setIsSuccess(false);
            setMessage(error.response.data.message);
            setTimeout(() => {setMessage("")}, 1000);
        });
    };

    const handleSaveRecipe = () => {
        setButtonGreyedOut(true);

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
            setButtonGreyedOut(false);
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
    }, [location.pathname, params.recipeId]);

    const inventoryItemsFromStorage = localStorage.getItem("inventoryList");
    const inventoryItemsArray = inventoryItemsFromStorage 
                                ? JSON.parse(inventoryItemsFromStorage) 
                                : [];

    const returnBadgeIfNameInArray = (name, array) => {
        const foundName = array.find(element => element.toLowerCase() === name.toLowerCase());
        return foundName && <StyledBadge>In Stock</StyledBadge>;
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
                <BackButton onClick={() => navigate(-1)}>
                    <StyledBackIcon src={arrowBackIcon} alt="go back"></StyledBackIcon>
                </BackButton>
            </ImageDiv>
            <StyledSection>
                <Title>{recipe.title}</Title>
                {recipe.diets.length > 0 && <StyledDiv>
                    <SubTitleDiv>
                        <StyledIcon src={dietIcon} alt=""></StyledIcon>
                        <SubTitle>Diets</SubTitle>
                    </SubTitleDiv>
                    <StyledList>
                        {recipe.diets.map((label, index) => <li key={index}>{label}</li>)}
                    </StyledList>
                </StyledDiv>}
                {recipe.cuisines.length > 0 && <StyledDiv>
                    <SubTitleDiv>
                        <StyledIcon src={cuisineIcon} alt=""></StyledIcon>
                        <SubTitle>Cuisines</SubTitle>
                    </SubTitleDiv>
                    <StyledList>
                        {recipe.cuisines.map((type, index) => <li key={index}>{type}</li>)}
                    </StyledList>
                </StyledDiv>}
                <StyledDiv>
                    <SubTitleDiv>
                        <StyledIcon src={timeIcon} alt=""></StyledIcon>
                        <span>{recipe.ready_min || recipe.readyInMinutes} Min</span>
                    </SubTitleDiv>
                </StyledDiv>
                <StyledDiv>
                    <SubTitleDiv>
                        <StyledIcon src={eggIcon} alt=""></StyledIcon>
                        <SubTitle>Ingredients</SubTitle>
                    </SubTitleDiv>
                    <MessageWithoutBorder
                        message={"(Click items to save to Grocery List.)"}
                        isSuccess={true}
                    ></MessageWithoutBorder>
                    <StyledList>
                        {recipe.extendedIngredients.map((ingredient, index) => 
                                <StyledListItem key={index} >
                                    <StyledButton 
                                        onClick={() => handleSaveIngredient(ingredient.name, index)}>
                                        {ingredient.original}
                                        {messagesArray[index] && <StyledTooltip isSuccess={isSuccess}>{messagesArray[index]}</StyledTooltip>}
                                    </StyledButton>
                                    {returnBadgeIfNameInArray(ingredient.name, inventoryItemsArray)}
                                </StyledListItem>
                            )
                        }
                    </StyledList>
                </StyledDiv>
                <StyledDiv>
                    <SubTitleDiv>
                        <StyledIcon src={instructionsIcon} alt=""></StyledIcon>
                        <SubTitle>Instructions</SubTitle>
                    </SubTitleDiv>
                    {parse(recipe.instructions)}
                </StyledDiv>
                <BiggerStyledButton 
                    buttonGreyedOut={buttonGreyedOut}
                    disabled={buttonGreyedOut}
                    buttonColor={location.pathname.includes("/users/recipes/") ? "var(--warning-color)" : "var(--primary-color)"}
                    buttonHoverColor={location.pathname.includes("/users/recipes/") ? "var(--warning-tonned-down-color)" : "var(--primary-tonned-down-color)"}
                    onClick={location.pathname.includes("/users/recipes/") ? handleDeleteRecipe : handleSaveRecipe} >
                    {location.pathname.includes("/users/recipes/") ? "Delete Recipe" : "Save Recipe"}
                    {message && <BiggerStyledTooltip isSuccess={isSuccess}>{message}</BiggerStyledTooltip>}
                </BiggerStyledButton>
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;