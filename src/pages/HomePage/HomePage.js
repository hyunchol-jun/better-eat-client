import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';

function HomePage({handleSearch, recipes}) {

  return (
    <main className="home-page">
      <PreferenceBar />
      <Search handleSearch={handleSearch}/>
      <RecipesList recipes={recipes}/>
    </main>
  );
}

export default HomePage;