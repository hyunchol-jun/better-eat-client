import "./PreferenceBar.scss";
import moreIcon from "../../assets/icons/more.svg";
import closeIcon from "../../assets/icons/close.svg";
import addIcon from "../../assets/icons/add.svg";

function PreferenceBar() {
    return (
        <section className='preference-bar'>
          <button className='icon-button'><img className='preference-bar__expand' src={moreIcon} alt="more button"/></button>
          <div className='preference-bar__field'>
            <div className='preference-bar__item'>
              <span>Vegan</span>
              <button className='icon-button'><img className="preference-bar__delete" src={closeIcon} alt="" /></button>
            </div>
            <div className='preference-bar__item'>
              <span>Korean</span>
              <button className='icon-button'><img className="preference-bar__delete" src={closeIcon} alt="" /></button>
            </div>
          </div>
          <button className='icon-button'><img className='preference-bar__add' src={addIcon} alt="add button"/></button>
        </section>
    );
}

export default PreferenceBar;