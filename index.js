const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: 'Note test 1',
    date: '2019-05-30T17:30:31.098Z',
    
  },
  {
    id: 2,
    content: 'Note test 2',
    date: '2011-05-30T18:39:34.091Z',
    
  },
  {
    id: 3,
    content: 'Note test 3',
    date: '2024-05-30T19:20:14.298Z',
    
  }
]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    let id = Number(request.params.id)
    console.log(id, typeof id)
    const note = notes.find((elem)=>elem.id === id)
    if(!note)
        response.status(404).end()
    response.json(note)
 
});


const createNewNote = (note)=>{
  const ids = notes.map((elem)=>elem.id)
  const maxId = Math.max(...ids)
  return({
    id: maxId+1,
    content: note.content,
    date: new Date().toISOString(),
    important: Math.random() > 0.5 ? true : false
  })
}

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const newnote = createNewNote(note)
  console.log(newnote)
  notes = [...notes,newnote]
  response.json(newnote)
})

app.delete('/api/notes/:id', (request, response) => {
    let id = Number(request.params.id)
    console.log(id, typeof id)
    notes =  notes = notes.filter((elems)=>elems.id !==id)
    response.status(204)
    response.json(notes)
});

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
