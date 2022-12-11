import "./Search.scss";

interface SearchProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Search({ handleSearch }: SearchProps) {
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <input className="search__textbox" name="textInput" required />
        <button className="search__submit">Search</button>
      </form>
    </section>
  );
}

export default Search;
