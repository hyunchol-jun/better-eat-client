import "./PreferenceBar.scss";
import moreIcon from "../../assets/icons/more.svg";
import closeIcon from "../../assets/icons/close.svg";
import addIcon from "../../assets/icons/add.svg";
import IconButton from "../IconButton/IconButton";

function PreferenceBar({healthTypes, dietTypes, handleHealthTypeChange, handleDietTypeChange}) {
    return (
        <section className='preference-bar'>
          <IconButton className="preference-bar__expand" imgSrc={moreIcon} altText="more button"/>
          <div className='preference-bar__field'>
            {Object.entries(healthTypes).map((type, index) => {
              return (
                <label key={index}>
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleHealthTypeChange(type[0])}
                  />
                  {type[0]}
                </label>
              );
            })}
            {Object.entries(dietTypes).map((type, index) => {
              return (
                <label key={index}>
                  <input type="checkbox"
                    checked={type[1]}
                    onChange={() => handleDietTypeChange(type[0])}
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