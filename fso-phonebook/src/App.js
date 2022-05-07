import { useState, useEffect } from "react";

import bookService from "./services/personBook";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null)

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
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingEntry.id ? response : p))
          )
          setMessage(
            `${existingEntry.name}'s number was updated!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 1000)
        })
        .catch((error) => {
          setMessage(
            `ERROR: ${existingEntry.name}'s information has already been removed from the database!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        });
    } else {
      const personEntry = { name: newName, number: newPhoneNumber };

      bookService.create(personEntry).then((response) => {
        setPersons(persons.concat(response));
        setMessage(
          `${personEntry.name} was added to the phonebook!`
        )
        setTimeout(() => {
          setMessage(null)
        }, 1000)
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
      <Notification message={message}/>
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
