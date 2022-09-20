import "./PreferenceBar.scss";
import moreIcon from "../../assets/icons/more.svg";
import closeIcon from "../../assets/icons/close.svg";
import addIcon from "../../assets/icons/add.svg";
import IconButton from "../IconButton/IconButton";

function PreferenceBar() {
    return (
        <section className='preference-bar'>
          <IconButton className="preference-bar__expand" imgSrc={moreIcon} altText="more button"/>
          <div className='preference-bar__field'>
            <div className='preference-bar__item'>
              <span>Vegan</span>
              <IconButton className="preference-bar__delete" imgSrc={closeIcon} altText="" />
            </div>
            <div className='preference-bar__item'>
              <span>Korean</span>
              <IconButton className="preference-bar__delete" imgSrc={closeIcon} altText="" />
            </div>
          </div>
          <IconButton className="preference-bar__add" imgSrc={addIcon} altText="add button" />
        </section>
    );
}

export default PreferenceBar;