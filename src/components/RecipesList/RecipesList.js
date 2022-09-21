import "./RecipesList.scss";
import {useState} from "react";
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetail from "../../pages/RecipeDetail/RecipeDetail";

function RecipesList({recipes}) {
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
                <RecipeCard key={index} recipe={recipe.recipe}/>
              );
            })
          }
        </section>
    );
}

export default RecipesList;