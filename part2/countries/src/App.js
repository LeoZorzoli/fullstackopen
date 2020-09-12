import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterCountry, setFilterCountries ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterCountries(event.target.value)
  }

  const countriesFilter = filterCountry
    ? countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))
    : countries;
  
  return (
    <div>
      < Filter value={filterCountry} onChange={handleFilterChange} />
      <div>
        <Result countries={countriesFilter} setFilterCountries={(filter) => setFilterCountries(filter)}/>
      </div>
    </div>
  )
}

export default App