import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <Person person={person} key={person.id} deletePerson={deletePerson} />
        );
      })}
    </>
  );
};

export default Persons;
