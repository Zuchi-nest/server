const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "zuugii0113",
  database: "blog",
});

app.post("/create", (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const body = req.body.body;
  db.query(
    "INSERT INTO blogs (author, title, body) VALUES (?,?,?)",
    [author, title, body],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM blogs WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/update", (req, res) => {
  const id = req.body.id;
  const body = req.body.body;
  db.query(
    "UPDATE blogs SET body = ? WHERE id = ?",
    [body, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM blogs WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

