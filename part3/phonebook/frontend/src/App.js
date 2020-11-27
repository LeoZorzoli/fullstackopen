import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPerson, setFilterPerson ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ status, setStatus ] = useState(-1)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
      event.preventDefault()
      const personObject = {
          name: newName,
          id: newName,
          number: newNumber,
      }

      const already = persons.find(person => person.name === newName)

      if (already){
        const confirm = window.confirm(`${newName} is already added to phonebook, do you want to replace the number?`)
        if(confirm){
          personsService
          .update(already.id, personObject)
          .then(updated => {setPersons(persons.map(p => p.id === updated.id ? updated : p))})
          .catch(error => {
            console.log(error)
            setMessage(`Information of ${confirm.name} has already been removed from server`)
            setStatus(2)
          })
        }
      } else if (personObject.name.length < 3){
          setMessage(`The name ${personObject.name} have less than 3 characters`)
          setStatus(2)
      } else if (personObject.number < 8){
          setMessage(`The number ${personObject.number} have less than 8 characters`)
          setStatus(2)
      } else {
        personsService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
          setMessage(
            `Added '${personObject.name}'`
          )
          setStatus(1)
      }
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(null)
        setStatus(-1)
      }, 3000)
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

  const removePerson = (person) => {
    const confirm = window.confirm(`Delete ${person.name}?`)
    if(confirm){
      personsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        setMessage(
          `Deleted ${person.name}`
        )
        setStatus(2)
        setTimeout(() => {
          setMessage(null)
          setStatus(-1)
        }, 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  const personsFilter = filterPerson
    ? persons.filter(person => person.name.toLowerCase().search(filterPerson.toLowerCase()) !== -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} status={status} />
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

      <ul>
        {personsFilter.map(person => <Person person={person} key={person.id} name={person.name} number={person.number} handleDelete={(person) => removePerson(person)} />)}
      </ul>
        
    </div>
  )
}   

export default App