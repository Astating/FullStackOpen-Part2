import { useState, useEffect } from "react";
import bookService from "./services/personBook";

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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    bookService
      .getAll("http://localhost:3001/persons")
      .then((response) => setPersons(response));
  }, []);

  function addEntryToBook(e) {
    e.preventDefault();

    const existingEntry = persons.find((p) => p.name === newName);
    
    if (existingEntry && existingEntry.number === newPhoneNumber) {
      alert(`${newName} is already added to phonebook`);
    } else if (existingEntry) {
      const updatedEntry = { ...existingEntry, number: newPhoneNumber };

      bookService
        .update(existingEntry.id, updatedEntry)
        .then((response) =>
          setPersons(
            persons.map((p) => (p.id === existingEntry.id ? response : p))
          )
        );
    } else {
      const personEntry = { name: newName, number: newPhoneNumber };

      bookService.create(personEntry).then((response) => {
        setPersons(persons.concat(response));
      });
    }

    setNewName("");
    setNewPhoneNumber("");
  }

  function deleteEntry(id) {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name} ?`)) {
      bookService
        .erase(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          alert(`Entry ${id} was not found in the database : ${error}`);
        });
    }
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
      <Persons persons={persons} filter={filter} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
