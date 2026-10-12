const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => {
        return <Person person={person} key={person.name} />;
      })}
    </>
  );
};

export default Persons;
