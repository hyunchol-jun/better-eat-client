import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";
import {getRecipesList} from "./utils/http-helper";
import Signup from './pages/Signup';
import Login from './pages/Login';
import defaultHealthTypes from "./data/healthTypes";
import defaultDietTypes from "./data/dietTypes";

function App() {
  const [sidebarShown, setSidebarShown] = useState(false);
  const [recipes, setRecipes] = useState(null);

  const healthTypesFromStorage = JSON.parse(localStorage.getItem("healthTypes"));
  const dietTypesFromStorage = JSON.parse(localStorage.getItem("dietTypes"));
  const [healthTypes, setHealthTypes] = useState(healthTypesFromStorage);
  const [dietTypes, setDietTypes] = useState(dietTypesFromStorage);

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

  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = event.target.textInput.value;
    const recipeCallback = (response) => {
      setRecipes(response.data.hits);
    };

    // Convert the objects to arrays of keys
    const dietTypesInArray = [];
    const healthTypesInArray = [];

    for (const type in healthTypes) {
      if (healthTypes[type]) {
        healthTypesInArray.push(type);
      }
    }

    for (const type in dietTypes) {
      if (dietTypes[type]) {
        dietTypesInArray.push(type);
      }
    }

    // Call to the external API
    getRecipesList(
                  searchQuery, 
                  dietTypesInArray, 
                  healthTypesInArray, 
                  recipeCallback);
  };

  // Cache state value to ref
  useEffect(() => {
    localStorage.setItem("healthTypes", JSON.stringify(healthTypes));
  }, [healthTypes]);

  useEffect(() => {
    localStorage.setItem("dietTypes", JSON.stringify(dietTypes));
  }, [dietTypes]);

  const handleSidebarVisibility = () => {
    setSidebarShown(!sidebarShown);
  }

  return (
    <BrowserRouter>
      <PageHeader handleClick={handleSidebarVisibility}/> 
      {sidebarShown && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage 
                                    recipes={recipes} 
                                    handleSearch={handleSearch}
                                    healthTypes={healthTypes}
                                    dietTypes={dietTypes}
                                    handleDietTypeChange={handleDietTypeChange}
                                    handleHealthTypeChange={handleHealthTypeChange}
                                />}></Route>
        <Route path="/recipes" element={<RecipeDetail />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
