import "./RecipesList.scss";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loading from "../Loading/Loading";
import { Recipe } from "../../interfaces";

interface RecipesListProps {
  recipes: Recipe[] | null;
  to: string;
}

function RecipesList({ recipes, to }: RecipesListProps) {
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
