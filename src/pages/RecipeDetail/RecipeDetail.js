import "./RecipeDetail.scss";
import recipeSampleImage from "../../assets/images/recipe_sample.jpeg";

function RecipeDetail() {
    return (
        <main>
            <img src={recipeSampleImage} alt="food"/>
            <section>
                <h1>Red Sauce for Pizza</h1>
                <ul>
                    <li>Keto-Friendly</li>
                    <li>Vegan</li>
                    <li>Vegetarian</li>
                    <li>Pescatarian</li>
                    <li>Paleo</li>
                </ul>
                <h2>Cuisine Type</h2>
                <span>Italian</span>
                <ul>
                    <li>2 garlic cloves, finely grated</li>
                    <li>1 (28-ounce) can crushed tomatoes</li>
                    <li>2 tablespoons olive oil</li>
                    <li>1 1/2 teaspoons fine sea salt</li>
                </ul>
                <button>See Instructions</button>
            </section>
        </main>
    );
}

export default RecipeDetail;