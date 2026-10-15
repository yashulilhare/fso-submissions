const CountryList = ({ list, setCountryToShow }) => {
  return (
    <section id="country-list">
      {list.map((c) => (
        <p key={c.name.common}>
          {c.name.common}{" "}
          <button
            type="button"
            onClick={() => {
              setCountryToShow(c);
            }}
          >
            Show
          </button>
        </p>
      ))}
    </section>
  );
};

export default CountryList;
