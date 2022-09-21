import arrowBackIcon from "../../assets/icons/arrow_back.svg";
import styled from "styled-components";
import IconButton from "../../components/IconButton/IconButton";

const PageMain = styled.main`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
`;

const ImageDiv = styled.div`
    width: 100%;
    position: relative;
`;

const RecipeImage = styled.img`
    width: 100%;
`;

const Title = styled.h1`
`;

const Section = styled.section`
    margin: 1rem;
`;

const SubTitle = styled.h2`
    font-size: 1rem;
`;

const BackButton = styled(IconButton)`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

function RecipeDetail({recipe, handleButtonClick}) {
    return (
        <PageMain>
            <ImageDiv>
                <RecipeImage src={recipe.image} alt="food"></RecipeImage>
                <BackButton 
                    imgSrc={arrowBackIcon} 
                    altText="go back" 
                    handleClick={handleButtonClick}
                ></BackButton>
            </ImageDiv>
            <Section>
                <Title>Red Sauce for Pizza</Title>
                <SubTitle>Health Labels</SubTitle>
                <ul>
                    <li>Keto-Friendly</li>
                    <li>Vegan</li>
                    <li>Vegetarian</li>
                    <li>Pescatarian</li>
                    <li>Paleo</li>
                </ul>
                <SubTitle>Cuisine Type</SubTitle>
                <span>Italian</span>
                <SubTitle>Ingredients</SubTitle>
                <ul>
                    <li>2 garlic cloves, finely grated</li>
                    <li>1 (28-ounce) can crushed tomatoes</li>
                    <li>2 tablespoons olive oil</li>
                    <li>1 1/2 teaspoons fine sea salt</li>
                </ul>
                <button>See Instructions</button>
            </Section>
        </PageMain>
    );
}

export default RecipeDetail;