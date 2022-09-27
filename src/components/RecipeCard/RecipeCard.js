import "./RecipeCard.scss";
import {Link} from "react-router-dom";

function RecipeCard({recipe, to}) {
    return (
          <Link to={to + recipe.id} className='recipe-card'>
            <img className='recipe-card__image' src={recipe.image} alt="food recipe"/>
            <div className='recipe-card__text-container'>
              <span className='recipe-card__title'>{recipe.title}</span>
            </div>
          </Link>
    );
}

export default RecipeCard;