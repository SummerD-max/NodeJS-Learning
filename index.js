const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

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
  notes.push({
    ...body,
    id: notes.length + 1,
    important: false,
    date: new Date().toISOString("YYYY-MM-DD"),
  });
  response.json(body);
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
