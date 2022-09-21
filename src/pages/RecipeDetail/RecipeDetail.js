import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

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
    const recipe = useLocation().state.recipe;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                <Title>{recipe.label}</Title>
                <SubTitle>Health Labels</SubTitle>
                <StyledList>
                    {recipe.healthLabels.map((label, index) => <li key={index}>{label}</li>)}
                </StyledList>
                <SubTitle>Cuisine Type</SubTitle>
                <StyledList>
                    {recipe.cuisineType.map((type, index) => <li key={index}>{type}</li>)}
                </StyledList>
                <SubTitle>Ingredients</SubTitle>
                <StyledList>
                    {recipe.ingredients.map((ingredient, index) => <li key={index}><button>{ingredient.text}</button></li>)}
                </StyledList>
                <a href={recipe.url}>See Instructions</a>
            </StyledSection>
        </PageMain>
    );
}

export default RecipeDetail;