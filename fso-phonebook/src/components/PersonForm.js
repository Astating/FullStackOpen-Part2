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

export default PersonForm;