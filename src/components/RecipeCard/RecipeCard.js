import "./RecipeCard.scss";
import recipeSampleImage from "../../assets/images/recipe_sample.jpeg";

function RecipeCard() {
    return (
          <a className='recipe-card'>
            <img className='recipe-card__image' src={recipeSampleImage} alt="food recipe"/>
            <div className='recipe-card__text-container'>
              <span className='recipe-card__title'>Stuffed Por Tenderloin Marsala-Port Sauce</span>
              <span className='recipe-card__cooking-time'>45 Min</span>
            </div>
          </a>
    );
}

export default RecipeCard;