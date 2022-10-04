import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import suggestIcon from "../../assets/icons/suggest.svg";
import warningIcon from "../../assets/icons/warning.svg";
import Button from "../../components/Button";
import MessageWithIcon from "../../components/MessageWithIcon";

const StyledButton = styled(Button)`
  background-color: var(--secondary-color);

  &:hover {
    background-color: var(--secondary-text-color);
  }
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
  handleLoadMore,
  loadMoreButtonShown,
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
        ? <MessageWithIcon iconSrc={warningIcon} isSuccess={false}>
            There are no results.
          </MessageWithIcon>
        : recipes && recipes.length !== 0 && isRandom
        ? <>
            <MessageWithIcon iconSrc={suggestIcon} isSuccess={true}>
              Here are some suggestions based on your preference setting.
            </MessageWithIcon>
            <RecipesList recipes={recipes} to={"/recipes/"}/>
          </>
        : <RecipesList recipes={recipes} to={"/recipes/"}/>
      }
      {loadMoreButtonShown && <StyledButton buttonText="Load more" onClick={handleLoadMore}></StyledButton>}
    </main>
  );
}

export default HomePage;