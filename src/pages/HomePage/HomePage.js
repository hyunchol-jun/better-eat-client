import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import {getRecipesList} from "../../utils/http-helper";
import {useState} from "react";

function HomePage() {
  const [recipes, setRecipes] = useState(null);

  const diets = ["balanced", "low-sodium"];
  const healths = ["vegan", "celery-free"];

  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = event.target.textInput.value;
    const recipeCallback = (response) => {
      setRecipes(response.data.hits);
    };

    getRecipesList(searchQuery, diets, healths, recipeCallback);
  };


  return (
    <main className="home-page">
      <PreferenceBar />
      <Search handleSearch={handleSearch}/>
      <RecipesList recipes={recipes}/>
    </main>
  );
}

export default HomePage;