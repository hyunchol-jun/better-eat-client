import "./RecipesList.scss";
import RecipeCard from '../RecipeCard/RecipeCard';
import Loading from "../Loading/Loading";

function RecipesList({recipes}) {
    if (!recipes) {
      return (
        <Loading />
      );
    }

    return (
        <section>
          {
            recipes.map((recipe, index) => {
              return (
                <RecipeCard key={index} recipe={recipe}/>
              );
            })
          }
        </section>
    );
}

export default RecipesList;