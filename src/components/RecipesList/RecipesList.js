import "./RecipesList.scss";
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipesList() {
    return (
        <section>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </section>
    );
}

export default RecipesList;