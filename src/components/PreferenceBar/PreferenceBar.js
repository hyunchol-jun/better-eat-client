import "./PreferenceBar.scss";
import moreIcon from "../../assets/icons/more.svg";
import addIcon from "../../assets/icons/add.svg";
import IconButton from "../IconButton/IconButton";

function PreferenceBar({
  diets,
  cuisines,
  intolerances,
  handleDietChange,
  handleCuisineChange,
  handleIntoleranceChange
}) {
    return (
        <section className='preference-bar'>
          <IconButton className="preference-bar__expand" imgSrc={moreIcon} altText="more button"/>
          <div className='preference-bar__field'>
            {Object.entries(diets).map((type, index) => {
              return (
                <label key={index}>
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleDietChange(type[0])}
                  />
                  {type[0]}
                </label>
              );
            })}
            {Object.entries(cuisines).map((type, index) => {
              return (
                <label key={index}>
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleCuisineChange(type[0])}
                  />
                  {type[0]}
                </label>
              );
            })}
            {Object.entries(intolerances).map((type, index) => {
              return (
                <label key={index}>
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleIntoleranceChange(type[0])}
                  />
                  {type[0]}
                </label>
              );
            })}
          </div>
          <IconButton className="preference-bar__add" imgSrc={addIcon} altText="add button" />
        </section>
    );
}

export default PreferenceBar;