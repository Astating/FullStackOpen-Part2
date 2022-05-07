const Persons = ({ persons, filter, deleteEntry }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <li key={person.name}>
        {person.name} - {person.number}{" "}
        <button onClick={() => deleteEntry(person.id)}>delete</button>
      </li>
    ));
};

export default Persons;
