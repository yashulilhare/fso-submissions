const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button
        type="button"
        onClick={() => {
          if (!confirm(`Delete ${person.name}`)) {
            return;
          }
          deletePerson(person.id);
        }}
      >
        delete
      </button>
    </p>
  );
};

export default Person;
