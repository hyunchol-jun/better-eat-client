import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {getRecipesList} from "./utils/http-helper";
import defaultCuisines from "./data/defaultCuisines";
import defaultDiets from "./data/defaultDiets";
import defaultIntolerances from "./data/defaultIntolerances";
import MyRecipes from './pages/MyRecipes';
import GroceryList from './pages/GroceryList';
import InventoryList from './pages/InventoryList';

function App() {
  const [sidebarShown, setSidebarShown] = useState(false);

  const handleSidebarVisibility = () => {
    setSidebarShown(!sidebarShown);
  }

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

    const searchQuery = event.target.textInput.value;

    // Call to the external API
    getRecipesList(
                  searchQuery, 
                  dietsInArray, 
                  cuisinesInArray, 
                  intolerancesInArray,
                  (response) => {
                    setRecipes(response.data.results);
                  });
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
    <BrowserRouter>
      <PageHeader handleClick={handleSidebarVisibility}/> 
      {sidebarShown && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage 
                                  recipes={recipes}
                                  diets={diets}
                                  cuisines={cuisines}
                                  intolerances={intolerances}
                                  handleCuisineChange={handleCuisineChange}
                                  handleDietChange={handleDietChange}
                                  handleIntoleranceChange={handleIntoleranceChange}
                                  handleSearch={handleSearch}
                                />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetail />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recipes" element={<MyRecipes />}></Route>
        <Route path="/groceries" element={<GroceryList />}></Route>
        <Route path="/inventories" element={<InventoryList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
