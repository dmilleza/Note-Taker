const app = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid");
// const db = require("../db/db.json");

app.get("/notes", (req, res) => {
  // Read the db.json file using readFileSync, don't run without sync.
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // Send response of json data of GET request, must be parsed and stringify later
    res.json(JSON.parse(data));
  });
});

app.post("/notes", (req, res) => {
  // store new notes from body with req.body and id into an object
  const newNote = {
    ...req.body,
    id: uniqid(),
  };

  console.log("Post Request for new notes");

  //  Read data from JSON file
  let data = fs.readFileSync("./Develop/db/db.json", "utf8");

  const dataJSON = JSON.parse(data);

  // Pushed new note in notes file 'db.json'
  dataJSON.push(newNote);

  // Write notes data to 'db.json' file
  fs.writeFile(
    "./Develop/db/db.json",
    JSON.stringify(dataJSON),
    (err, text) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  console.log("Success, added a new note");

  // send json data response
  res.json(data);
});

app.delete("/notes/:id", function (req, res) {
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const id = req.params.id;
    const indexOfNote = notes.findIndex((x) => x.id === parseInt(id));
    notes.splice(indexOfNote, 1);
    fs.writeFile("./Develop/db/db.json", JSON.stringify(notes, "\t"), (err) => {
      if (err) throw err;
      return true;
    });
    res.json(req.body.id);
  });
});

module.exports = app;
