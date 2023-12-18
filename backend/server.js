const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "InfoPr",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO `users`(`username`,`email`, `password`) VALUES(?)";
  const values = [req.body.username, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/signin", (req, res) => {
  const sql = "SELECT * FROM `users` WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/insert_products", (req, res) => {
  const sql =
    "INSERT INTO `produits`(`Nom`, `Prix`, `Description`, `Stock`, `Source`, `Categorie`) VALUES ?";

  const values = req.body;
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error");
      return res.json("Error");
    }
    console.log("Success");
    return res.json("Products inserted successfully");
  });
});

app.post("/insert_nom", (req, res) => {
  const sql =
    "INSERT INTO `nomenclatures`(`Nom`, `Prix`, `Description`, `Stock`, `Source`, `Fournisseur`) VALUES ?";

  const values = req.body;
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json("Nomenclatures inserted successfully");
  });
});

app.post("/insert_stock", (req, res) => {
  const sql =
    "INSERT INTO `stock`(`Nom`, `Location`, `Product`, `Quantity`) VALUES ?";

  const values = req.body;
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json("Stock info inserted successfully");
  });
});

app.post("/insert_oper", (req, res) => {
  const sql =
    "INSERT INTO `operations`(`operation`, `quantity`, `duration`) VALUES ?";

  const values = req.body;
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error");
      return res.json("Error");
    }
    console.log("Success");
    return res.json("Operations inserted successfully");
  });
});

app.listen(8001, () => {
  console.log("listening on port 8001");
});
