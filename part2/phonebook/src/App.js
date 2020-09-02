import React, { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPerson, setFilterPerson] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const personObject = {
          name: newName,
          id: newName,
          number: newNumber,
      }

      const already = persons.filter(person => person.name === newName)

      if (already.length !== 0){
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
  }


  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const personsFilter = filterPerson
    ? persons.filter(person => person.name.toLowerCase().search(filterPerson.toLowerCase()) !== -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterPerson} onChange={handleFilterChange} />
      
      <h2>Add a new:</h2>

      <PersonForm 
        submit={addName} 
        name={newName} 
        number={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>

      <div>
        {personsFilter.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}
      </div>
        
    </div>
  )
}   

export default App