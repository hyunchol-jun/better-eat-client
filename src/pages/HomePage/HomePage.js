import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';

function HomePage() {
    return (
      <main className="home-page">
        <PreferenceBar />
        <Search />
        <RecipesList />
      </main>
    );
}

export default HomePage;