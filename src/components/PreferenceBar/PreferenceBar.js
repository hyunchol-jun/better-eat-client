import "./PreferenceBar.scss";
import moreIcon from "../../assets/icons/more.svg";
import {useState} from "react";

function PreferenceBar({
  diets,
  cuisines,
  intolerances,
  handleDietChange,
  handleCuisineChange,
  handleIntoleranceChange
}) {
  const [dietsShown, setDietsShown] = useState(false);
  const [cuisinesShown, setCuisinesShown] = useState(false);
  const [intolerancesShown, setIntolerancesShown] = useState(false);

  const handleDietsShown = () => {
    setDietsShown(!dietsShown);
  };

  const handleCuisinesShown = () => {
    setCuisinesShown(!cuisinesShown);
  };

  const handleIntolerancesShown = () => {
    setIntolerancesShown(!intolerancesShown);
  };

  return (
      <section className='preference-bar'>
        <button className="preference-bar__expand" onClick={handleDietsShown}>
          <img className={dietsShown ? "preference-bar__expand-icon preference-bar__expand-icon--active" : "preference-bar__expand-icon"} src={moreIcon} alt=""/>
          Set diet preference
        </button>
        <div className={dietsShown ? 'preference-bar__field preference-bar__field--active' : "preference-bar__field"}>
          {Object.entries(diets).map((type, index) => {
            return (
              <div key={index} className="preference-bar__row">
                <label className="preference-bar__label">
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleDietChange(type[0])}
                  />
                  <span className="preference-bar__slider"></span>
                </label>
                <span className="preference-bar__text">
                  {type[0]}
                </span>
              </div>
            );
          })}
        </div>
        <button className="preference-bar__expand" onClick={handleCuisinesShown}>
          <img className={cuisinesShown ? "preference-bar__expand-icon preference-bar__expand-icon--active" : "preference-bar__expand-icon"} src={moreIcon} alt=""/>
          Set cuisine preference
        </button>
        <div className={cuisinesShown ? 'preference-bar__field preference-bar__field--active' : "preference-bar__field"}>
          {Object.entries(cuisines).map((type, index) => {
            return (
              <div key={index} className="preference-bar__row">
                <label className="preference-bar__label">
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleCuisineChange(type[0])}
                  />
                  <span className="preference-bar__slider"></span>
                </label>
                <span className="preference-bar__text">
                  {type[0]}
                </span>
              </div>
            );
          })}
        </div>
        <button className="preference-bar__expand" onClick={handleIntolerancesShown}>
          <img className={intolerancesShown ? "preference-bar__expand-icon preference-bar__expand-icon--active" : "preference-bar__expand-icon"} src={moreIcon} alt=""/>
          Set intolerance preference
        </button>
        <div className={intolerancesShown ? 'preference-bar__field preference-bar__field--active' : "preference-bar__field"}>
          {Object.entries(intolerances).map((type, index) => {
            return (
              <div key={index} className="preference-bar__row">
                <label className="preference-bar__label">
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleIntoleranceChange(type[0])}
                  />
                  <span className="preference-bar__slider"></span>
                </label>
                <span className="preference-bar__text">
                  {type[0]}
                </span>
              </div>
            );
          })}
        </div>
      </section>
  );
}

export default PreferenceBar;