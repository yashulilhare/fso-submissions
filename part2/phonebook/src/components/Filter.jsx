const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };
  return (
    <div>
      filter show with:{" "}
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
