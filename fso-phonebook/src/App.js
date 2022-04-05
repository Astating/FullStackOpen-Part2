import { useState, useEffect } from "react";
import bookService from './services/personBook'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter: <input value={filter} onChange={setFilter} />
    </div>
  );
};

const PersonForm = ({
  addEntryToBook,
  newName,
  setNewName,
  newPhoneNumber,
  setNewPhoneNumber,
}) => {
  return (
    <form onSubmit={addEntryToBook}>
      <div>
        name: <input required value={newName} onChange={setNewName} />
      </div>
      <div>
        number:{" "}
        <input required value={newPhoneNumber} onChange={setNewPhoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({persons, filter}) => {
  return (
    persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
        </li>
      ))
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    bookService
      .getAll('http://localhost:3001/persons')
      .then(response => setPersons(response))
  }, [])

  function addEntryToBook(e) {
    e.preventDefault();

    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personEntry = { name: newName, number: newPhoneNumber };
      
      bookService
        .create(personEntry)
        .then(response => {
          setPersons(persons.concat(response))
        })
    }

    setNewName("");
    setNewPhoneNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={(e) => setFilter(e.target.value)} />
      <h3>Add a new entry</h3>
      <PersonForm
        addEntryToBook={addEntryToBook}
        newName={newName}
        setNewName={(e) => setNewName(e.target.value)}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={(e) => setNewPhoneNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
