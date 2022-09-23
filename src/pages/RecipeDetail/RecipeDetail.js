import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "../../utils/http-helper";
import parse from "html-react-parser";

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
`;

const Title = styled.h1`
    margin: 0;
`;

const StyledSection = styled.section`
    padding: 1rem;
    background-color: white;
`;

const SubTitle = styled.h2`
    font-size: 1rem;
`;

const BackButton = styled(IconButton)`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

const StyledList = styled.ul`
    list-style: none;
`;

function RecipeDetail() {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const params = useParams();

    useEffect(() => {
        getRecipeDetail(params.recipeId, (response) => {
            setRecipe(response.data);
        })
        window.scrollTo(0, 0);
    }, []);

    if (!recipe) {
        return <p>Loading...</p>;
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
                <SubTitle>Diets</SubTitle>
                <StyledList>
                    {recipe.diets.map((label, index) => <li key={index}>{label}</li>)}
                </StyledList>
                <SubTitle>Cuisines</SubTitle>
                <StyledList>
                    {recipe.cuisines.map((type, index) => <li key={index}>{type}</li>)}
                </StyledList>
                <SubTitle>Ingredients</SubTitle>
                <StyledList>
                    {recipe.extendedIngredients.map((ingredient, index) => <li key={index}><button>{ingredient.original}</button></li>)}
                </StyledList>
                <SubTitle>Instructions</SubTitle>
                {parse(recipe.instructions)}
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;