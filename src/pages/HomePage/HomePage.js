import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import {getRecipesList} from "../../utils/http-helper";

function HomePage() {
  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = event.target.textInput.value;
    const recipeCallback = (response) => {
      console.log(response.data);
    };
    getRecipesList(searchQuery, "balanced", "vegan", recipeCallback);

  }

  return (
    <main className="home-page">
      <PreferenceBar />
      <Search handleSearch={handleSearch}/>
      <RecipesList />
    </main>
  );
}

export default HomePage;