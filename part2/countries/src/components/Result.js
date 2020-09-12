import React from 'react'
import Country from './Country'

const Result = ({countries, setFilterCountries}) => {

    if(countries.length === 1){
        return(
            <div>
                {countries.map(country => 
                    <Country 
                        setFilterCountries={setFilterCountries}
                        key={country.name}
                        showDetails={true}
                        country={country}
                    />
                )}
            </div>
        )
    } else {
        return(
            <div>
                {countries.length > 10 ? 'Too many matches, specify another filter' : countries.map(country => 
                    <Country 
                        setFilterCountries={setFilterCountries}
                        showDetails={false}  
                        key={country.name} 
                        country={country} 
                    />
                )}           
            </div>
        )
    }
}

export default Result