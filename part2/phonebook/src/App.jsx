import "./index.css";

import { useState, useEffect } from "react";
import personsService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const updatePerson = (id, person) => {
    personsService
      .update(id, person)
      .then((data) => {
        const updatedPersons = persons.map((p) =>
          p.id === data.id ? data : p,
        );
        setPersons(updatedPersons);
        setNewPerson({ name: "", number: "" });
        setMessage(
          `Updated ${data.name}'s old number ${person.number} to ${data.number}`,
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
    personsService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewPerson({ name: "", number: "" });
        setMessage(`Added ${data.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    personsService
      .delete(id)
      .then((personData) => {
        const updatedPersons = persons.filter((p) => p.id !== personData.id);
        setPersons(updatedPersons);
      })
      .catch(() => {
        const personObj = persons.find((p) => p.id === id);
        setErrorMessage(
          `Note: '${personObj.name}' was already deleted from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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

      {message && <p className="success">{message}</p>}
      {errorMessage && <p className="error">{message}</p>}

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
