import "./RecipesList.scss";
import RecipeCard from '../RecipeCard/RecipeCard';

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