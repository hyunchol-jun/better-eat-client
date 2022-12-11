import "./App.scss";
import PageHeader from "./components/PageHeader/PageHeader";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getRecipesList, getRecipesListRandomly } from "./utils/http-helper";
import { convertPreferenceObjectIntoArray } from "./utils/object-helper";
import defaultCuisines from "./data/defaultCuisines.json";
import defaultDiets from "./data/defaultDiets.json";
import defaultIntolerances from "./data/defaultIntolerances.json";
import MyRecipes from "./pages/MyRecipes";
import GroceryList from "./pages/GroceryList";
import InventoryList from "./pages/InventoryList";
import NotFound from "./components/NotFound/NotFound";
import PageFooter from "./components/PageFooter";
import { Recipe } from "./interfaces";

function App() {
  const mediaQuery = useMemo(() => window.matchMedia("(max-width: 767px)"), []);
  const desktopMediaQuery = useMemo(
    () => window.matchMedia("(min-width: 1280px)"),
    []
  );

  const [isMobile, setIsMobile] = useState(mediaQuery.matches);
  const [isDesktop, setIsDesktop] = useState(desktopMediaQuery.matches);
  const [sidebarShown, setSidebarShown] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState("close-animation");
  const [backgroundAnimation, setBackgroundAnimation] =
    useState("clear-animation");

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loadMoreShown, setLoadMoreShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isRandom, setIsRandom] = useState(true);

  const dietsFromStorage = localStorage.getItem("diets");
  const cuisinesFromStorage = localStorage.getItem("cuisines");
  const intolerancesFromStorage = localStorage.getItem("intolerances");
  const [diets, setDiets] = useState(
    dietsFromStorage ? JSON.parse(dietsFromStorage) : defaultDiets
  );
  const [cuisines, setCuisines] = useState(
    cuisinesFromStorage ? JSON.parse(cuisinesFromStorage) : defaultCuisines
  );
  const [intolerances, setIntolerances] = useState(
    intolerancesFromStorage
      ? JSON.parse(intolerancesFromStorage)
      : defaultIntolerances
  );

  const handleSidebarVisibility = () => {
    setSidebarAnimation(sidebarShown ? "close-animation" : "open-animation");
    setBackgroundAnimation(
      sidebarShown ? "clear-animation" : "opaque-animation"
    );

    if (sidebarShown) {
      setTimeout(() => setSidebarShown(!sidebarShown), 300);
    } else {
      setSidebarShown(!sidebarShown);
    }
  };

  const handleDietChange = (dietName) => {
    setDiets((prevState) => {
      const copiedDiets = { ...prevState };
      copiedDiets[dietName] = !copiedDiets[dietName];
      return copiedDiets;
    });
  };

  const handleCuisineChange = (cuisineName) => {
    setCuisines((prevState) => {
      const copiedCuisines = { ...prevState };
      copiedCuisines[cuisineName] = !copiedCuisines[cuisineName];
      return copiedCuisines;
    });
  };

  const handleIntoleranceChange = (intoleranceName) => {
    setIntolerances((prevState) => {
      const copiedIntolerances = { ...prevState };
      copiedIntolerances[intoleranceName] =
        !copiedIntolerances[intoleranceName];
      return copiedIntolerances;
    });
  };

  const handleSearch = (event: any, itemName: string | null = null) => {
    event.preventDefault();

    setIsRandom(false);

    // If the second argument is provided, use it for the query,
    // otherwise get it from the form
    setSearchQuery(itemName || event.target.textInput.value);

    // Call to the external API
    getRecipesList(
      itemName || event.target.textInput.value,
      convertPreferenceObjectIntoArray(diets),
      convertPreferenceObjectIntoArray(cuisines),
      convertPreferenceObjectIntoArray(intolerances),
      0,
      (response) => {
        setRecipes(response.data.results);
        setCurrentOffset(20);
        setLoadMoreShown(response.data.results.length === 20);
      }
    );
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
        setRecipes([...recipes!].concat(response.data.results));
        setCurrentOffset(currentOffset + 20);
        setLoadMoreShown(response.data.results.length === 20);
      }
    );
  };

  useEffect(() => {
    getRecipesListRandomly(
      convertPreferenceObjectIntoArray(diets),
      convertPreferenceObjectIntoArray(cuisines),
      convertPreferenceObjectIntoArray(intolerances),
      (response) => {
        setRecipes(response.data.recipes);
        setIsRandom(true);
      }
    );
  }, [diets, cuisines, intolerances]);

  useEffect(() => {
    const changeTabletHandler = (event) => {
      setIsMobile(event.matches);
    };

    const changeDesktopHandler = (event) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", changeTabletHandler);
    desktopMediaQuery.addEventListener("change", changeDesktopHandler);

    return () => {
      mediaQuery.removeEventListener("change", changeTabletHandler);
      desktopMediaQuery.removeEventListener("change", changeDesktopHandler);
    };
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
      <PageHeader
        handleClick={handleSidebarVisibility}
        sidebarShown={sidebarShown}
      />
      {!isDesktop && sidebarShown && (
        <Sidebar
          sidebarAnimation={sidebarAnimation}
          backgroundAnimation={backgroundAnimation}
          handleBackgroundClick={handleSidebarVisibility}
        />
      )}
      {!isDesktop && !sidebarShown && !isMobile && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
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
            />
          }
        ></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetail />}></Route>
        <Route
          path="/users/recipes/:recipeId"
          element={<RecipeDetail />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recipes" element={<MyRecipes />}></Route>
        <Route path="/groceries" element={<GroceryList />}></Route>
        <Route
          path="/inventories"
          element={<InventoryList handleSearch={handleSearch} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <PageFooter />
    </BrowserRouter>
  );
}

export default App;
