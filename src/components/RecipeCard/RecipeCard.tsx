import "./RecipeCard.scss";
import { Link } from "react-router-dom";
import { Recipe } from "../../interfaces";

interface RecipeCardProps {
  recipe: Recipe;
  to: string;
}

function RecipeCard({ recipe, to }: RecipeCardProps) {
  return (
    <Link to={to + recipe.id} className="recipe-card">
      <img
        className="recipe-card__image"
        src={recipe.image}
        alt="food recipe"
      />
      <div className="recipe-card__text-container">
        <span className="recipe-card__title">{recipe.title}</span>
      </div>
    </Link>
  );
}

export default RecipeCard;
