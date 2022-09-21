import "./Search.scss";

function Search({handleSearch}) {
    return (
        <section className='search'>
          <form className='search__form' onSubmit={handleSearch}>
            <input className='search__textbox' name="textInput"/>
            <button className='search__submit'>Search</button>
          </form>
        </section>
    );
}

export default Search;