require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', function getBody (request) {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const people = persons.length
        const date = new Date()
        response.send(`<p>Phonebook has info for ${people} people</p><p>${date[Symbol.toPrimitive]('string')}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)
    
//     if (person) {
//       response.json(person)
//     } else {
//       response.status(404).end()
//     }
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
  
//     response.status(204).end()
// })

// const generateID = () => {
//     const newID = Math.floor(Math.random() * 200)
//     const allID = persons.map(person => person.id)
//     while (allID.includes(newID)) {
//         newID = Math.floor(Math.random() * 200)
//         console.log(newID)
//     }
//     return newID
// }

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     const allNames = persons.map(person => person.name)

//     if (!body.name) {
//         return response.status(400).json({
//             error: 'name missing'
//         })
//     } else if (!body.number) {
//         return response.status(400).json({
//             error: 'number missing'
//         })
//     } else if (allNames.includes(body.name)) {
//         return response.status(400).json({
//             error: 'name must be unique'
//         })
//     }

//     const person = {
//         id: generateID(),
//         name: body.name,
//         number: body.number
//     }

//     persons = persons.concat(person)

//     response.json(person)
// })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})