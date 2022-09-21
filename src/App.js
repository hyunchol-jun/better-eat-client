import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import {getRecipesList} from "./utils/http-helper";

function App() {
  const [sidebarShown, setSidebarShown] = useState(false);
  const [recipes, setRecipes] = useState(null);

  const diets = ["balanced", "low-sodium"];
  const healths = ["vegan", "celery-free"];

  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = event.target.textInput.value;
    const recipeCallback = (response) => {
      setRecipes(response.data.hits);
    };

    getRecipesList(searchQuery, diets, healths, recipeCallback);
  };


  const handleSidebarVisibility = () => {
    setSidebarShown(!sidebarShown);
  }

  return (
    <BrowserRouter>
      <PageHeader handleClick={handleSidebarVisibility}/> 
      {sidebarShown && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage recipes={recipes} handleSearch={handleSearch}/>}></Route>
        <Route path="/recipes" element={<RecipeDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
