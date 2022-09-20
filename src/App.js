import './App.scss';
import menuIcon from "./assets/icons/menu.svg";
import moreIcon from "./assets/icons/more.svg";
import closeIcon from "./assets/icons/close.svg";
import addIcon from "./assets/icons/add.svg";
import recipeSampleImage from "./assets/images/recipe_sample.jpeg";

function App() {
  return (
    <div>
      <header className='header'>
        <button className='header__menu icon-button'><img src={menuIcon} alt='hamburger icon'/></button>
        <span className='header__title'>BetterEat</span>
        <a className="header__auth" href="#">Login</a>
      </header>
      <main>
        <section className='preference'>
          <button className='icon-button'><img className='preference__expand' src={moreIcon} alt="more button"/></button>
          <div className='preference__field'>
            <div className='preference__item'>
              <span>Vegan</span>
              <button className='icon-button'><img className="preference__delete" src={closeIcon} alt="" /></button>
            </div>
            <div className='preference__item'>
              <span>Korean</span>
              <button className='preference__delete icon-button'><img className="preference__delete" src={closeIcon} alt="" /></button>
            </div>
          </div>
          <button className='preference__add icon-button'><img className='preference__add' src={addIcon} alt="add button"/></button>
        </section>
        <section className='search'>
          <form className='search__form'>
            <input className='search__textbox'/>
            <button className='search__submit'>Search</button>
          </form>
        </section>
        <section>
          <a className='card'>
            <img className='card__image' src={recipeSampleImage} alt="food recipe"/>
            <div className='card__text-container'>
              <span className='card__title'>Stuffed Por Tenderloin Marsala-Port Sauce</span>
              <span className='card__cooking-time'>45 Min</span>
            </div>
          </a>
          <a className='card'>
            <img className='card__image' src={recipeSampleImage} alt="food recipe"/>
            <div className='card__text-container'>
              <span className='card__title'>Stuffed Por Tenderloin Marsala-Port Sauce</span>
              <span className='card__cooking-time'>45 Min</span>
            </div>
          </a>
          <a className='card'>
            <img className='card__image' src={recipeSampleImage} alt="food recipe"/>
            <div className='card__text-container'>
              <span className='card__title'>Stuffed Por Tenderloin Marsala-Port Sauce</span>
              <span className='card__cooking-time'>45 Min | 4 Ingredients</span>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;
