import recipeSampleImage from "../../assets/images/recipe_sample.jpeg";
import styled from "styled-components";

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
`

function RecipeDetail() {
    return (
        <main>
            <RecipeImage src={recipeSampleImage} alt="food"></RecipeImage>
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
        </main>
    );
}

export default RecipeDetail;