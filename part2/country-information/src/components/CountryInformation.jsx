const CountryInformation = ({ country }) => {
  return (
    <section>
      <h1>{country.name.common}</h1>
      <p>{country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      {Object.values(country.languages).map((lang) => (
        <p key={lang}>{lang}</p>
      ))}

      <img
        src={country.flags.png}
        alt={`Flag for country ${country.name.common}`}
      />
    </section>
  );
};

export default CountryInformation;
