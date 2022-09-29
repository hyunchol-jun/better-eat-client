import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect, useRef, useMemo} from "react";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {getRecipesList, getRecipesListRandomly} from "./utils/http-helper";
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
  const [loadMoreButtonShown, setLoadMoreButtonShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isRandom, setIsRandom] = useState(null);

  const dietsFromStorage = JSON.parse(localStorage.getItem("diets"));
  const cuisinesFromStorage = JSON.parse(localStorage.getItem("cuisines"));
  const intolerancesFromStorage = JSON.parse(localStorage.getItem("intolerances"));
  const [diets, setDiets] = useState(dietsFromStorage);
  const [cuisines, setCuisines] = useState(cuisinesFromStorage);
  const [intolerances, setIntolerances] = useState(intolerancesFromStorage);
  const dietsRef = useRef();
  const cuisinesRef = useRef();
  const intolerancesRef = useRef();
  const recipesRef = useRef();
  dietsRef.current = dietsFromStorage || defaultDiets;
  cuisinesRef.current = cuisinesFromStorage || defaultCuisines;
  intolerancesRef.current = intolerancesFromStorage || defaultIntolerances;

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

    // Convert the objects into arrays of keys
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

    // If the second argument is provided, use it for the query,
    // otherwise get it from the form
    const tempSearchQuery = itemName || event.target.textInput.value;
    setSearchQuery(tempSearchQuery);

    // Call to the external API
    getRecipesList(
                  tempSearchQuery, 
                  dietsInArray, 
                  cuisinesInArray,
                  0,
                  intolerancesInArray,
                  (response) => {
                    recipesRef.current = response.data.results;
                    setRecipes(response.data.results);
                    setCurrentOffset(20);
                    setLoadMoreButtonShown(response.data.results.length === 20);
                    console.log(response.data.number)
                    console.log(response.data.offset)
                  });
  };

  const handleLoadMore = () => {
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
                  currentOffset,
                  intolerancesInArray,
                  (response) => {
                    const tempResults = recipesRef.current.concat(response.data.results);
                    setRecipes(tempResults);
                    recipesRef.current = tempResults;
                    setCurrentOffset(currentOffset + 20)
                    setLoadMoreButtonShown(response.data.results.length === 20);
                    console.log(response.data.number)
                    console.log(response.data.offset)
                  });
  };

  const randomSearchBasedOnPreference = () => {
    const dietsInArray = [];
    const cuisinesInArray = [];
    const intolerancesInArray = [];

    for (const type in dietsRef.current) {
      if (dietsRef.current[type]) {
        dietsInArray.push(type);
      }
    }

    for (const type in cuisinesRef.current) {
      if (cuisinesRef.current[type]) {
        cuisinesInArray.push(type);
      }
    }

    for (const type in intolerancesRef.current) {
      if (intolerancesRef.current[type]) {
        intolerancesInArray.push(type);
      }
    }

    getRecipesListRandomly(
                          dietsInArray,
                          cuisinesInArray,
                          intolerancesInArray,
                          (response) => {
                            setRecipes(response.data.recipes);
                            setIsRandom(true);
                          });
  };

  useEffect(() => {
    randomSearchBasedOnPreference();
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
                                  loadMoreButtonShown={loadMoreButtonShown}
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
