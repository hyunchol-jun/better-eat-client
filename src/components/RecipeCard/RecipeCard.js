import "./RecipeCard.scss";

function RecipeCard({recipe}) {
    return (
          <a className='recipe-card'>
            <img className='recipe-card__image' src={recipe.image} alt="food recipe"/>
            <div className='recipe-card__text-container'>
              <span className='recipe-card__title'>{recipe.label}</span>
              <span className='recipe-card__cooking-time'>{recipe.totalTime + " Min"}</span>
            </div>
          </a>
    );
}

export default RecipeCard;