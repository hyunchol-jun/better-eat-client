import "./HomePage.js";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';

function HomePage() {
    return (
      <main>
        <PreferenceBar />
        <Search />
        <RecipesList />
      </main>
    );
}

export default HomePage;