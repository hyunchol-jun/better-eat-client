import "./Search.scss";

function Search() {
    return (
        <section className='search'>
          <form className='search__form'>
            <input className='search__textbox'/>
            <button className='search__submit'>Search</button>
          </form>
        </section>
    );
}

export default Search;