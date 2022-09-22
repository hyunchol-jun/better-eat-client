import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({
                    handleSearch, 
                    recipes, 
                    handleDietTypeChange, 
                    handleHealthTypeChange,
                    dietTypes,
                    healthTypes
                  }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="home-page">
      <PreferenceBar 
        healthTypes={healthTypes} 
        dietTypes={dietTypes} 
        handleHealthTypeChange={handleHealthTypeChange}
        handleDietTypeChange={handleDietTypeChange}
      />
      <Search handleSearch={handleSearch}/>
      <RecipesList recipes={recipes}/>
    </main>
  );
}

export default HomePage;