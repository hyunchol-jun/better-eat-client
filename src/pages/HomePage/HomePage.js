import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import defaultHealthTypes from "../../data/healthTypes";
import defaultDietTypes from "../../data/dietTypes";

function HomePage({handleSearch, recipes}) {
  const navigate = useNavigate();
  const healthTypesFromStorage = JSON.parse(localStorage.getItem("healthTypes"));
  const dietTypesFromStorage = JSON.parse(localStorage.getItem("dietTypes"));
  const [healthTypes, setHealthTypes] = useState(healthTypesFromStorage);
  const [dietTypes, setDietTypes] = useState(dietTypesFromStorage);

  // Reference to state value to get updated data
  const healthTypesRef = useRef(); 
  const dietTypesRef = useRef();

  const handleHealthTypeChange = (typeName) => {
    setHealthTypes((prevState) => {
      const copiedHealthTypes = {...prevState};
      copiedHealthTypes[typeName] = !copiedHealthTypes[typeName];
      return copiedHealthTypes;
    })
  }

  const handleDietTypeChange = (typeName) => {
    setDietTypes((prevState) => {
      const copiedDietTypes = {...prevState};
      copiedDietTypes[typeName] = !copiedDietTypes[typeName];
      return copiedDietTypes;
    });
  }

  if (!healthTypes) {
    setHealthTypes(defaultHealthTypes);
  }

  if (!dietTypes) {
    setDietTypes(defaultDietTypes);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // Cache state value to ref
  useEffect(() => {
    healthTypesRef.current = {...healthTypes};
    localStorage.setItem("healthTypes", JSON.stringify(healthTypesRef.current));
  }, [healthTypes]);

  useEffect(() => {
    dietTypesRef.current = {...dietTypes};
    localStorage.setItem("dietTypes", JSON.stringify(dietTypes));
  }, [dietTypes]);

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