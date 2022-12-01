import "./RecipesList.scss";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loading from "../Loading/Loading";

function RecipesList({ recipes, to }) {
  if (!recipes) {
    return <Loading />;
  }

  return (
    <section className="recipes-list">
      {recipes.map((recipe, index) => {
        return <RecipeCard key={index} recipe={recipe} to={to} />;
      })}
    </section>
  );
}

export default RecipesList;
