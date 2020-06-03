const express = require("express");
const app = express();
const port = 3000;
var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({users: []})
  .write()
 
app.listen(port, () => console.log(`Server start at link http://localhost:${port}`))

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req, res) => {
  res.render('index')
});
 
app.get("/todos", function(req, res) {
  var q = req.query.q;
  var tempArr = db.get('users').value()
  res.render("todos/index", {
    todos: tempArr
  });
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create");
});
 
app.post("/todos/create", function(req, res) {
  db.get('users').push(req.body).write();
  res.redirect("back")
  });