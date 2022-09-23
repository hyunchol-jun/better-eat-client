import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getRecipesList} from "../../utils/http-helper";
import defaultCuisines from "../../data/defaultCuisines";
import defaultDiets from "../../data/defaultDiets";
import defaultIntolerances from "../../data/defaultIntolerances";

function HomePage() {

  // Check if logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [recipes, setRecipes] = useState(null);

  const dietsFromStorage = JSON.parse(localStorage.getItem("diets"));
  const cuisinesFromStorage = JSON.parse(localStorage.getItem("cuisines"));
  const intolerancesFromStorage = JSON.parse(localStorage.getItem("intolerances"));
  const [diets, setDiets] = useState(dietsFromStorage);
  const [cuisines, setCuisines] = useState(cuisinesFromStorage);
  const [intolerances, setIntolerances] = useState(intolerancesFromStorage);

  const handleDietChange = (dietName) => {
    setDiets((prevState) => {
      const copiedDiets = {...prevState};
      copiedDiets[dietName] = !copiedDiets[dietName];
      return copiedDiets;
    })
  }

  const handleCuisineChange = (cuisineName) => {
    setCuisines((prevState) => {
      const copiedCuisines = {...prevState};
      copiedCuisines[cuisineName] = !copiedCuisines[cuisineName];
      return copiedCuisines;
    });
  }

  const handleIntoleranceChange = (intoleranceName) => {
    setIntolerances((prevState) => {
      const copiedIntolerances = {...prevState};
      copiedIntolerances[intoleranceName] = !copiedIntolerances[intoleranceName];
      return copiedIntolerances;
    });
  }

  if (!diets) {
    setDiets(defaultDiets);
  }

  if (!cuisines) {
    setCuisines(defaultCuisines);
  }

  if (!intolerances) {
    setIntolerances(defaultIntolerances);
  }

  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = event.target.textInput.value;
    const recipeCallback = (response) => {
      setRecipes(response.data.results);
    };

    // Convert the objects to arrays of keys
    const dietsInArray = [];
    const cuisinesInArray = [];
    const intolerancesInArray = [];

    for (const type in diets) {
      if (diets[type]) {
        dietsInArray.push(type);
      }
    }

    for (const type in cuisines) {
      if (cuisines[type]) {
        cuisinesInArray.push(type);
      }
    }

    for (const type in intolerances) {
      if (intolerances[type]) {
        intolerancesInArray.push(type);
      }
    }

    // Call to the external API
    getRecipesList(
                  searchQuery, 
                  dietsInArray, 
                  cuisinesInArray, 
                  intolerancesInArray,
                  recipeCallback);
  };

  useEffect(() => {
    localStorage.setItem("diets", JSON.stringify(diets));
  }, [diets]);

  useEffect(() => {
    localStorage.setItem("cuisines", JSON.stringify(cuisines));
  }, [cuisines]);

  useEffect(() => {
    localStorage.setItem("intolerances", JSON.stringify(intolerances));
  }, [intolerances]);

  return (
    <main className="home-page">
      <PreferenceBar 
        diets={diets}
        cuisines={cuisines}
        intolerances={intolerances}
        handleDietChange={handleDietChange}
        handleCuisineChange={handleCuisineChange}
        handleIntoleranceChange={handleIntoleranceChange}
      />
      <Search handleSearch={handleSearch}/>
      <RecipesList recipes={recipes}/>
    </main>
  );
}

export default HomePage;