const express = require("express");
const app = express();
const cors = require("cors");
const uniqid = require("uniqid");
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: uniqid(),
    tittle: "Note test 1",
    text: "Note test 1",
    date: "Sat May   1 2022",
    color: "dark",
  },
  {
    id: uniqid(),
    tittle: "Note test 2",
    text: "Note test 2",
    date: "Sun Feb 19 2022",
    color: "light",
  },
  {
    id: uniqid(),
    tittle: "Note test 3",
    text: "Note test 3",
    date: "Sat Mar 29 2021",
    color: "primary",
  },
];

const createNewNote = (note) => {
  return {
    id: uniqid(),
    tittle: note.tittle,
    text: note.text,
    date: new Date().toDateString(),
    color: note.color,
  };
};

//sends json with all notes
app.get("/api/notes", (request, response) => {
  return response.json(notes);
});

//sends note with especific id
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((elem) => elem.id === id);
  if (!note) response.status(404).end();
  return response.json(note);
});

//adds note
app.post("/api/notes", (request, response) => {
  const note = request.body;
  if (!note || !note.text || !note.tittle) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const newnote = createNewNote(note);
  notes = [...notes, newnote];
  return response.json(newnote);
});

//deletes note with especific id
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((elems) => elems.id !== id);
  response.status(204);
  return response.json(notes);
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
