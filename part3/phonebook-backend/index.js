const express = require("express");

const app = express();
app.use(express.json());

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];

app.get("/", (req, res) => {
  res.status(404).send("<p>Please use valid resource url.</p>");
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `);
});

app.get("/api/persons", (req, res) => {
  if (!persons || persons.length === 0) {
    return res.send("There are no person info stored.");
  }
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send(`No person found with id ${req.params.id}`);
  }
});

const generateId = () => {
  const maxId = persons.reduce((acc, curr) => {
    const currId = Number(curr.id);
    if (acc < currId) {
      return currId;
    } else return acc;
  }, 0);

  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name or number field is missing" });
  }

  const person = persons.find((p) => p.name === name);
  if (person) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const id = generateId();
  console.log(id);
  const newPerson = {
    name,
    number,
    id: String(id),
  };
  persons.push(newPerson);

  res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const index = persons.indexOf((p) => p.id === req.params.id);
  if (index >= 0) {
    persons.splice(index, 1);
  }

  // Either there was a person or not, sending 204
  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
