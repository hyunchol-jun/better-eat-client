import "./RecipesList.scss";
import {useState} from "react";
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetail from "../../pages/RecipeDetail/RecipeDetail";

function RecipesList({recipes}) {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleCardClick = (recipe) => {
      setSelectedRecipe(recipe);
      setIsClicked(true);
    }

    const handleButtonClick = () => {
      setIsClicked(false);
    }

    if (isClicked) {
      return (
        <RecipeDetail handleButtonClick={handleButtonClick} recipe={selectedRecipe}/>
      );
    }


    if (!recipes) {
      return (
        <div>Loading...</div>
      );
    }

    return (
        <section>
          {
            recipes.map((recipe, index) => {
              return (
                <RecipeCard key={index} recipe={recipe.recipe} handleCardClick={handleCardClick}/>
              );
            })
          }
        </section>
    );
}

export default RecipesList;