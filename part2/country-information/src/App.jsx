import countriesService from "./services/countries";
import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryInformation from "./components/CountryInformation";

const App = () => {
  console.log("app rendered");
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const [countryToShow, setCountryToShow] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const getFilteredList = () => {
    const countryList = [];

    if (filter.trim().length !== 0) {
      for (const country of countries) {
        if (countryList.length > 10) {
          return countryList;
        }

        if (country.name.common.toLowerCase().includes(filter.toLowerCase())) {
          countryList.push(country);
        }
      }
    }
    return countryList.length > 0 && countryList.length <= 10
      ? countryList
      : [];
  };

  const filteredList = getFilteredList();

  const showMessage =
    filter.length === 0
      ? "Type in the search bar to search  for countries."
      : filteredList.length === 0
        ? `No match found for the country ${filter}`
        : filteredList.length > 10
          ? "Too many matches, specify another filter"
          : null;

  const countryObj = countryToShow
    ? countryToShow
    : filteredList.length === 1
      ? filteredList[0]
      : null;

  return (
    <div>
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        setCountryToShow={setCountryToShow}
      />

      {showMessage && !countryToShow && <p>{showMessage}</p>}

      {!countryToShow && !showMessage && filteredList.length !== 1 && (
        <CountryList list={filteredList} setCountryToShow={setCountryToShow} />
      )}
      {countryObj && <CountryInformation country={countryObj} />}
    </div>
  );
};

export default App;
