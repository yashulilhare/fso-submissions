import { useState, useEffect } from "react";
import personsService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((personsData) => {
      console.log(personsData);
      setPersons(personsData);
    });
  }, []);

  const updatePerson = (id, person) => {
    personsService.update(id, person).then((data) => {
      console.log(data);
      const updatedPersons = persons.map((p) => (p.id === data.id ? data : p));
      setPersons(updatedPersons);
      setNewPerson({ name: "", number: "" });
    });
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObj = persons.find((person) => person.name === newPerson.name);
    if (personObj) {
      const shouldUpdate = confirm(
        `${personObj.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (shouldUpdate) {
        if (
          personObj.name === newPerson.name &&
          personObj.number === newPerson.number
        )
          return;
        updatePerson(personObj.id, { ...newPerson });
        return;
      }
    }
    personsService.create(newPerson).then((data) => {
      setPersons(persons.concat(data));
      setNewPerson({ name: "", number: "" });
    });
  };

  const deletePerson = (id) => {
    personsService.delete(id).then((personData) => {
      const updatedPersons = persons.filter((p) => p.id !== personData.id);
      setPersons(updatedPersons);
    });
  };

  const namesToDisplay =
    filter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={namesToDisplay} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
