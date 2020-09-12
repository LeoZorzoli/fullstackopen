import React from 'react'
import Button from './Button'

const Country = ( {country, showDetails, setFilterCountries} ) => {

    const handleClick = () => {
        setFilterCountries(country.name)
    }

    if(showDetails){
        return(
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital} </div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
                <img src={country.flag} width='150' />
            </div>
        )
    } else {
        return(
            <div>
                {country.name}
                <button onClick={handleClick}>show</button>
            </div>
        )
    }
}

export default Country