import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageWithoutBorder from "../../components/MessageWithoutBorder";
import styled from "styled-components";
import suggestIcon from "../../assets/icons/suggest.svg";
import warningIcon from "../../assets/icons/warning.svg";
import Button from "../../components/Button";

const StyledMessageContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const StyledIcon = styled.img`
    width: 1.5rem;
`;

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
        ? <StyledMessageContainer>
            <StyledIcon src={warningIcon} alt=""></StyledIcon>
            <MessageWithoutBorder 
              message={"There are no results."}
              isSuccess={false}></MessageWithoutBorder>
          </StyledMessageContainer>
        : recipes && recipes.length !== 0 && isRandom
        ? <>
          <StyledMessageContainer>
            <StyledIcon src={suggestIcon} alt=""></StyledIcon>
            <MessageWithoutBorder isSuccess={true}>
              Here are some suggestions based on your preference setting.
            </MessageWithoutBorder> 
          </StyledMessageContainer>
            <RecipesList recipes={recipes} to={"/recipes/"}/>
          </>
        : <RecipesList recipes={recipes} to={"/recipes/"}/>
      }
      {loadMoreButtonShown && <StyledButton buttonText="Load more" onClick={handleLoadMore}></StyledButton>}
    </main>
  );
}

export default HomePage;