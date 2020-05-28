// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var listTodos = [
  { id: 1, content: "Đi chợ" },
  { id: 1, content: "Nấu cơm" },
  { id: 1, content: "Rửa bát" },
  { id: 1, content: "Học tại codersX" }
];

app.get("/", (req, res) => {
  res.render("index");
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

// bạn post ngay trên todos/create cũng đc 
// nếu xóa cái create.pug đi ảnh hưởng gì ko bạn

// hừm miễn là bạn ko gọi đến app.get("/todos/create") thì nó không ảnh hưởng gì dda
// @@ mà mình nghĩ nên xóa đi cho nó gọn :))
// oke mình hiểu bài rồi, cám ơn bạn nhiều hihi
// không có gì ^^ bạn qua bấm hoàn thành giúp mình nha :3
// oke fine star , good support :DDD
 app.listen(process.env.PORT, () => {
  console.log("Server listening on port ");
});
