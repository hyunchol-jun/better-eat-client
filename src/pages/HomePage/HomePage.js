import "./HomePage.scss";
import PreferenceBar from '../../components/PreferenceBar/PreferenceBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import Search from '../../components/Search/Search';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import styled from "styled-components";
import suggestIcon from "../../assets/icons/suggest.svg";
import warningIcon from "../../assets/icons/warning.svg";

const StyledMessageContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledIcon = styled.img`
    width: 1.5rem;
`;

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
            <MessageWithoutBorder 
              message={"Suggestions based on your food preference."}
              isSuccess={true}></MessageWithoutBorder> 
          </StyledMessageContainer>
            <RecipesList recipes={recipes} to={"/recipes/"}/>
          </>
        : <RecipesList recipes={recipes} to={"/recipes/"}/>
      }
    </main>
  );
}

export default HomePage;