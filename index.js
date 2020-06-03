const express = require("express");
const app = express();
const port = 3000;
var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({user: {}})
  .write()

app.listen(port, () => console.log(`Server start at link http://localhost:${port}`))

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var listTodos = [
  { id: 1, content: "Đi chợ" },
  { id: 1, content: "Nấu cơm" },
  { id: 1, content: "Rửa bát" },
  { id: 1, content: "Học tại codersX" },
];

app.get("/", (req, res) => {
  res.render('index')
});

app.get("/todos", function(req, res) {
  var q = req.query.q;
  var matchTodos = listTodos;
  if (q) {
    matchTodos = listTodos.filter(function(item) {
      return item.content.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }
  res.render("todos/index", {
    todos: matchTodos,
    temp: q
  });
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create");
});

app.post("/todos/create", function(req, res) {
  listTodos.push(req.body)
  res.redirect("back")
  });
