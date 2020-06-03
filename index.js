const express = require("express");
const app = express();
const port = 3000;
var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

var shortid = require("shortid");


// Set some defaults (required if your JSON file is empty)
db.defaults({users: []})
  .write()
 
app.listen(port, () => console.log(`Server start at link http://localhost:${port}`))

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//router get site home
app.get("/", (req, res) => {
  res.render('index')
});
 

//router get site users
app.get("/user", function(req, res) {
  var q = req.query.q;
  if (q) {
    var newArr = db.get('users').value()
    console.log(newArr)
    var listFilter = newArr.filter(function(user) {
      return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1
    })
    res.render("user/index", {
      user: listFilter
    })
  }
  res.render("user/index", {
    user: db.get('users').value()
  });
});
 

//router get site create
app.get("/user/create", (req, res) => {
  res.render("user/create");
});


//routert post --- to add user
app.post("/user/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect("back")
  });


// Xoa user khoi data base

app.get("/user/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get('users')
    .remove({id: id})
      .write();
  res.redirect("/user")
})