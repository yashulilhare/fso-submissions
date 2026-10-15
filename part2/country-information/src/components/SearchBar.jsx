const SearchBar = ({ filter, setFilter, countryToShow, setCountryToShow }) => {
  return (
    <div>
      find countries:{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          if (countryToShow) {
            setCountryToShow(null);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
