const express = require("express");
const app = express();

app.use(express.json());

let telRecords = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456111111",
    date: new Date(),
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(telRecords);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<div><div>Phone has info for ${telRecords.length} people</div><div>${new Date()}</div></div>`,
  );
});

app.get("/api/person/:id", (request, response) => {
  const id = request.params.id;
  const person = telRecords.find((record) => record.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "person not found" });
  }
});

app.delete("/api/person/:id", (request, response) => {
  const id = request.params.id;
  const person = telRecords.find((record) => record.id === id);
  if (person) {
    telRecords = telRecords.filter((record) => record.id !== id);
    response.status(204).end();
  } else {
    response.status(404).json({ error: "person not found" });
  }
});

app.post("/api/person", (request, response) => {
  const body = request.body;

  const { name, number } = body;

  if (!name || !number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  if (telRecords.some((record) => record.name === name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const generateId = () => {
    const maxId = 1000000;
    return String(Math.floor(Math.random() * maxId));
  };

  const person = {
    id: generateId(),
    name,
    number,
  };

  telRecords.push(person);

  response.status(201).json(person);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
