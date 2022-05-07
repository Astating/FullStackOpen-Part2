const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter: <input value={filter} onChange={setFilter} />
    </div>
  );
};

export default Filter;
