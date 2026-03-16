const express = require("express");
const cors = require("cors");
const dayjs = require("dayjs");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const PORT = process.env.PORT || 3001;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2023-01-01",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2023-01-02",
    important: false,
  },
];

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  const newNote = {
    ...body,
    id: notes.length + 1,
    date: dayjs().format("YYYY-MM-DD"),
  };
  notes.push(newNote);
  response.json(newNote);
  console.log(notes);
});

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = request.body;
  notes = notes.map((n) => (n.id === id ? { ...n, ...note } : n));
  response.json(note);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
