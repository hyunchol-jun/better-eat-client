import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultHealthTypes from "../../data/healthTypes";
import defaultDietTypes from "../../data/dietTypes";

function HomePage({handleSearch, recipes}) {
  const navigate = useNavigate();
  const healthTypesFromStorage = JSON.parse(localStorage.getItem("healthTypes"));
  const dietTypesFromStorage = JSON.parse(localStorage.getItem("dietTypes"));
  const [healthTypes, setHealthTypes] = useState(healthTypesFromStorage);
  const [dietTypes, sestDietTypes] = useState(dietTypesFromStorage);

  const handleHealthTypeChange = (typeName) => {
    const copiedHealthTypes = {...healthTypes};
    copiedHealthTypes[typeName] = !copiedHealthTypes[typeName];
    setHealthTypes(copiedHealthTypes)
  }

  const handleDietTypeChange = (typeName) => {
    const copiedDietTypes = {...dietTypes};
    copiedDietTypes[typeName] = !copiedDietTypes[typeName];
    sestDietTypes(copiedDietTypes);
  }

  if (!healthTypes) {
    setHealthTypes(defaultHealthTypes);
  }

  if (!dietTypes) {
    sestDietTypes(defaultDietTypes);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    return () => {
      localStorage.setItem("healthTypes", JSON.stringify(healthTypes));
      localStorage.setItem("dietTypes", JSON.stringify(dietTypes));
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