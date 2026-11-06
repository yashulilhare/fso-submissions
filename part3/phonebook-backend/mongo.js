const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit();
}

const password = process.argv[2];
const encodedPassword = encodeURIComponent(password);

const url = `mongodb+srv://lilhareyashu_db_user:${encodedPassword}@cluster0.gkeodqu.mongodb.net/`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log("error", err);
      mongoose.connection.close();
    });
} else {
  Person.find({})
    .then((persons) => {
      console.log("phonebook:");

      persons.forEach((p) => {
        console.log(`${p.name} ${p.number}`);
      });
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    });
}
