const PersonForm = ({ newPerson, setNewPerson, addPerson }) => {
  const handleNameChange = (e) => {
    setNewPerson({ ...newPerson, name: e.target.value });
  };

  const handleNumberChange = (e) => {
    setNewPerson({ ...newPerson, number: String(e.target.value) });
  };

  return (
    <form>
      <div>
        <label htmlFor="name">name: </label>
        <input
          id="name"
          name="name"
          value={newPerson.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">number:</label>
        <input
          type="tel"
          id="number"
          name="number"
          value={newPerson.number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
