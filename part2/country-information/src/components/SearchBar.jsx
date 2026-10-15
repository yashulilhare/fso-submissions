const SearchBar = ({ filter, setFilter, setCountryToShow }) => {
  return (
    <div>
      find countries:{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCountryToShow(null);
        }}
      />
    </div>
  );
};

export default SearchBar;
