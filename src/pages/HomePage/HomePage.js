import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import styled from "styled-components";

const MessageWithoutBorder = styled(Message)`
  border: none;
`;

function HomePage({
  recipes,
  diets,
  cuisines,
  intolerances,
  handleCuisineChange,
  handleDietChange,
  handleIntoleranceChange,
  handleSearch,
  isRandom
}) {

  // Check if logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


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
      {recipes && recipes.length === 0
        ? <MessageWithoutBorder 
            message={"There are no results."}
            isSuccess={false}></MessageWithoutBorder>
        : recipes && recipes.length !== 0 && isRandom
        ? <>
            <MessageWithoutBorder 
              message={"Suggestions based on your food preference."}
              isSuccess={true}></MessageWithoutBorder> 
            <RecipesList recipes={recipes} to={"/recipes/"}/>
          </>
        : <RecipesList recipes={recipes} to={"/recipes/"}/>
      }
    </main>
  );
}

export default HomePage;