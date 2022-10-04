import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {getRecipesList, getRecipesListRandomly} from "./utils/http-helper";
import { convertPreferenceObjectIntoArray } from './utils/object-helper';
import defaultCuisines from "./data/defaultCuisines";
import defaultDiets from "./data/defaultDiets";
import defaultIntolerances from "./data/defaultIntolerances";
import MyRecipes from './pages/MyRecipes';
import GroceryList from './pages/GroceryList/GroceryList';
import InventoryList from './pages/InventoryList';
import NotFound from './components/NotFound/NotFound';
import PageFooter from './components/PageFooter';

function App() {
  const mediaQuery = useMemo(() => window.matchMedia("(max-width: 767px)"), []);
  const desktopMediaQuery = useMemo(() => window.matchMedia("(min-width: 1280px)"), []);
  const [isMobile, setIsMobile] = useState(mediaQuery.matches);
  const [isDesktop, setIsDesktop] = useState(desktopMediaQuery.matches);
  const [sidebarShown, setSidebarShown] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState("close-animation");
  const [backgroundAnimation, setBackgroundAnimation] = useState("clear-animation");

  const handleSidebarVisibility = () => {
    setSidebarAnimation(sidebarShown ? "close-animation" : "open-animation");
    setBackgroundAnimation(sidebarShown ? "clear-animation" : "opaque-animation");
    if (sidebarShown) {
      setTimeout(() => setSidebarShown(!sidebarShown), 300);
    } else {
      setSidebarShown(!sidebarShown);
    }
  };

  const [recipes, setRecipes] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loadMoreShown, setLoadMoreShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isRandom, setIsRandom] = useState(null);

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

  const handleSearch = (event, itemName) => {
    event.preventDefault();

    setIsRandom(false);

    // If the second argument is provided, use it for the query,
    // otherwise get it from the form
    const searchQuery = itemName || event.target.textInput.value;
    setSearchQuery(searchQuery);

    // Call to the external API
    getRecipesList(
                  searchQuery, 
                  convertPreferenceObjectIntoArray(diets), 
                  convertPreferenceObjectIntoArray(cuisines),
                  convertPreferenceObjectIntoArray(intolerances),
                  0,
                  (response) => {
                    setRecipes(response.data.results);
                    setCurrentOffset(20);
                    setLoadMoreShown(response.data.results.length === 20);
                  });
  };

  const handleLoadMore = () => {
    // Call to the external API
    getRecipesList(
                  searchQuery, 
                  convertPreferenceObjectIntoArray(diets), 
                  convertPreferenceObjectIntoArray(cuisines),
                  convertPreferenceObjectIntoArray(intolerances),
                  currentOffset,
                  (response) => {
                    setRecipes([...recipes].concat(response.data.results));
                    setCurrentOffset(currentOffset + 20)
                    setLoadMoreShown(response.data.results.length === 20);
                  });
  };

  useEffect(() => {
    getRecipesListRandomly(
                          convertPreferenceObjectIntoArray(diets),
                          convertPreferenceObjectIntoArray(cuisines),
                          convertPreferenceObjectIntoArray(intolerances),
                          (response) => {
                            setRecipes(response.data.recipes);
                            setIsRandom(true);
                          });
  }, []);

  useEffect(() => {
    const changeTabletHandler = (event) => {
      setIsMobile(event.matches);
    };

    const changeDesktopHandler = (event) => {
      setIsDesktop(event.matches);
    }

    mediaQuery.addEventListener("change", changeTabletHandler);
    desktopMediaQuery.addEventListener("change", changeDesktopHandler);

    return () => {
      mediaQuery.removeEventListener("change", changeTabletHandler);
      desktopMediaQuery.removeEventListener("change", changeDesktopHandler);
    }
  }, [mediaQuery, desktopMediaQuery]);

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
      <PageHeader handleClick={handleSidebarVisibility} sidebarShown={sidebarShown}/> 
      {!isDesktop && sidebarShown && <Sidebar sidebarAnimation={sidebarAnimation} 
                                backgroundAnimation={backgroundAnimation}
                                handleBackgroundClick={handleSidebarVisibility}/>}
      {(!isDesktop && !sidebarShown && !isMobile) 
        && <Sidebar />
      }
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
                                  handleLoadMore={handleLoadMore}
                                  loadMoreShown={loadMoreShown}
                                  isRandom={isRandom}
                                />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetail />}></Route>
        <Route path="/users/recipes/:recipeId" element={<RecipeDetail />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recipes" element={<MyRecipes />}></Route>
        <Route path="/groceries" element={<GroceryList />}></Route>
        <Route path="/inventories" element={<InventoryList handleSearch={handleSearch} />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <PageFooter />
    </BrowserRouter>
  );
}

export default App;
