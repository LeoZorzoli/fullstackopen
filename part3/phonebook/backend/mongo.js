const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const phone = process.argv[4]

const url =
  `mongodb+srv://leozorzoli:${password}@cluster0.l0kgx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  phone: phone,
})

if(!phone && !name){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.phone)
    })
    mongoose.connection.close()
  })
} else{
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
