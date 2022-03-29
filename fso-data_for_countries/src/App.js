import { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({list}) => {
  if (list.length === 0) {
    return (
      <p>Hmmm... no results found</p>
    )
  } else if (list.length === 1) {
    return (
      <>
        <h3>{list[0].name.common}</h3>
        <p>capital: {list[0].capital[0]}</p>
        <p>area: {list[0].area}</p>
        <p>languages: {Object.values(list[0].languages).join(", ")}.</p>
        <img width="250px" src={list[0].flags.svg}></img>


      </>
    )
  } else {
    return (
      <>{list.map((country) => <li key={country.name.common}>{country.name.common}</li>)}</>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        console.log(response.data)
        setCountries(response.data);
      })
  }, [])

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase())).slice(0,10);





  return (
    <div className="App">
      <div>Find countries: <input value={filter} onChange={(e) => setFilter(e.target.value)}/></div>
      <Countries list={filteredCountries}/>
    </div>
  );
}

export default App;
