const axios = require("axios");
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

////////////// Products
app.post("/insert_products", (req, res) => {
  const sql =
    "INSERT INTO `produits`(`Nom`, `Prix`, `Description`, `Stock`, `Quantite`, `Categorie`) VALUES (?)";

  const values = req.body;
  console.log(values);
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }

    return res.json("Products inserted successfully");
  });
});
app.get("/get_products", (req, res) => {
  const sql =
    "SELECT produit_id,Nom,Prix,Description,Stock,Quantite,Categorie FROM `produits`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.post("/delete_products", (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM produits WHERE produit_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/check_produit", (req, res) => {
  const [Nom, Categorie] = req.body;
  console.log(Nom, Categorie);

  const query =
    "SELECT COUNT(*) AS count FROM produits WHERE Nom = ? AND Categorie = ?";

  db.query(query, [Nom, Categorie], (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const exists = result[0].count > 0;
    console.log(exists);
    return res.status(200).json({ exists });
  });
});

app.post("/delete_products", (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM produits WHERE produit_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

///////////// Operation
app.post("/UpdateProduit", (req, res) => {
  const values = req.body;
  let sql;

  sql = "UPDATE `produits` SET `Quantite`=? WHERE `Nom`=?";

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/insert_oper", (req, res) => {
  const values = req.body;
  let sql;
  if (values.length > 1) {
    sql = "INSERT INTO `operations`(`operation`, `duration`) VALUES (?)";
  } else {
    sql = "INSERT INTO `operations`(`operation`, `duration`) VALUES ?";
  }

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.json("Error");
    }
    return res.json("Operation(s) inserted successfully");
  });
});

app.get("/get_oper", (req, res) => {
  const sql = "SELECT op_id,operation,duration FROM `operations`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.get("/get_op_menu", (req, res) => {
  const sql = "SELECT operation FROM `operations`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.post("/delete_oper", (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM operations WHERE op_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/check_oper", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM operations WHERE operation = ?";

  db.query(query, req.body, (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const exists = result[0].count > 0;
    console.log(exists);
    return res.status(200).json({ exists });
  });
});
////////////// Stock

app.post("/insert_stock", async (req, res) => {
  try {
    const sql = "INSERT INTO `stock`(`Nom`, `Location`) VALUES (?)";

    const values = req.body;
    console.log(values);
    let skipped = 0;
    let inserted = 0;

    // Check stock for each element in the array
    for (const value of values) {
      const checkStockResponse = await axios.post(
        "http://localhost:8001/check_stock",
        [value[0]]
      );

      if (checkStockResponse.data.exists) {
        // Handle the case when the stock already exists
        console.log(`Stock for ${value[0]} at ${value[0]} already exists`);
        skipped += 1;
      } else {
        // Insert into the stock table
        db.query(sql, [value], (err, data) => {
          if (err) {
            console.error("Error:", err);
            return res.json("Error");
          }

          console.log("Stocked inserted");
        });
        inserted += 1;
      }
    }
    console.log({ inserted: inserted, skipped: skipped });

    return res.json({ inserted: inserted, skipped: skipped });
  } catch (error) {
    console.error("Error:", error);
    return res.json("Error");
  }
});

app.get("/get_stock", (req, res) => {
  const sql = "SELECT stock_id,Nom,Location FROM `stock`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.get("/get_stocks_menu", (req, res) => {
  const sql = "SELECT Nom,stock_id FROM `stock`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.post("/delete_stock", (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM stock WHERE stock_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});
app.post("/check_stock", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM stock WHERE Nom = ?";

  db.query(query, req.body, (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const exists = result[0].count > 0;
    return res.status(200).json({ exists });
  });
});
////////////// Gestion de nomenclatures
app.get("/get_nom", (req, res) => {
  const sql =
    "SELECT n.`nomenclature_id`, p1.`Nom` AS produit_nom, p2.`Nom` AS nomenclature_nom, o.`operation`, n.`quantite` " +
    "FROM `nomenclatures` n " +
    "JOIN `produits` p1 ON n.`produit` = p1.`produit_id` " +
    "JOIN `produits` p2 ON n.`nomenclature` = p2.`produit_id` " +
    "JOIN `operations` o ON n.`operation` = o.`op_id`";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(data);

    return res.status(200).json(data);
  });
});

app.get("/get_produit_menu", (req, res) => {
  const sql = "SELECT Nom FROM `produits` WHERE Categorie='Produit'";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.get("/get_nom_menu", (req, res) => {
  const sql = "SELECT Nom FROM `produits` WHERE Categorie='Nomenclature'";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.post("/delete_nom", (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM nomenclatures WHERE nomenclature_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/insert_nom", (req, res) => {
  const sql =
    "INSERT INTO `nomenclatures`(`produit`, `nomenclature`, `operation`, `quantite`) VALUES ?";

  const sql_p_n = "SELECT `produit_id` FROM `produits` WHERE `Nom` = ?";
  const sql_o = "SELECT `op_id` FROM `operations` WHERE `operation` = ?";

  const values = req.body;
  let p = 0;
  let n = 0;
  let o = 0;

  // Function to execute queries in series
  function executeQueries(callback) {
    db.query(sql_p_n, [values[0]], (err, data) => {
      if (err) {
        console.log("Error");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      p = data[0]?.produit_id || 0;

      db.query(sql_p_n, [values[1]], (err, data) => {
        if (err) {
          console.log("Error");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        n = data[0]?.produit_id || 0;

        db.query(sql_o, [values[2]], (err, data) => {
          if (err) {
            console.log("Error");
            return res.status(500).json({ error: "Internal Server Error" });
          }
          o = data[0]?.op_id || 0;

          // Now you can use p, n, o in your insert query or other logic
          console.log(p, n, o);

          // Example insert query
          const insertValues = [[p, n, o, values[3]]];
          db.query(sql, [insertValues], (err, data) => {
            if (err) {
              console.log("Error");
              return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.json("Nomenclature inserted successfully");
          });
        });
      });
    });
  }

  // Execute queries
  executeQueries();
});

///////////// Orders
app.post("/insert_order", (req, res) => {
  const values = req.body;
  sql = "INSERT INTO `orders`(`product`, `stock`) VALUES (?)";

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/insert_order2", (req, res) => {
  const values = req.body;
  sql = "INSERT INTO `orders`(`product`, `stock`,`duration`) VALUES (?)";

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post("/insert_nom", (req, res) => {
  const values = req.body;
  console.log(values);
  // const sql =
  //   "INSERT INTO `nomenclatures`(`produit`, `nomenclature`, `operation`, `quantite`) VALUES ?";

  // const sql_p_n = "SELECT `produit_id` FROM `produits` WHERE `Nom` = ?";
  // const sql_o = "SELECT `op_id` FROM `operations` WHERE `operation` = ?";

  // const values = req.body;
  // let p = 0;
  // let n = 0;
  // let o = 0;

  // // Function to execute queries in series
  // function executeQueries(callback) {
  //   db.query(sql_p_n, [values[0]], (err, data) => {
  //     if (err) {
  //       console.log("Error");
  //       return res.status(500).json({ error: "Internal Server Error" });
  //     }
  //     p = data[0]?.produit_id || 0;

  //     db.query(sql_p_n, [values[1]], (err, data) => {
  //       if (err) {
  //         console.log("Error");
  //         return res.status(500).json({ error: "Internal Server Error" });
  //       }
  //       n = data[0]?.produit_id || 0;

  //       db.query(sql_o, [values[2]], (err, data) => {
  //         if (err) {
  //           console.log("Error");
  //           return res.status(500).json({ error: "Internal Server Error" });
  //         }
  //         o = data[0]?.op_id || 0;

  //         // Now you can use p, n, o in your insert query or other logic
  //         console.log(p, n, o);

  //         // Example insert query
  //         const insertValues = [[p, n, o, values[3]]];
  //         db.query(sql, [insertValues], (err, data) => {
  //           if (err) {
  //             console.log("Error");
  //             return res.status(500).json({ error: "Internal Server Error" });
  //           }

  //           return res.json("Nomenclature inserted successfully");
  //         });
  //       });
  //     });
  //   });
  // }

  // // Execute queries
  // executeQueries();
});

app.post("/insert_orders", (req, res) => {
  const values = req.body;
  console.log("Values:", values);

  function getStocks() {
    let produit_id = 0;
    let produit_stock = "";

    const sql_link =
      "SELECT `produit_id`,`Stock`,`Quantite` from `produits` WHERE `Nom` = ?";
    const sql_nom =
      "SELECT nomenclature,quantite,operation from nomenclatures WHERE produit = ?";
    const sql_select =
      "SELECT Nom,Stock,Quantite FROM produits WHERE produit_id = ?"; // AND Stock = ?

    const sql_op = "SELECT operation,duration FROM operations WHERE op_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql_link, [values[0][0]], (err, data) => {
        if (err) {
          console.log("Error");
          reject({ error: "Internal Server Error" });
        }
        produit_id = data[0]?.produit_id || 0;
        produit_stock = data[0]?.Stock || 0;
        quantity = data[0]?.Quantite || 0;

        req_quantite = parseInt(values[0][1]);

        const resteAFabriquer = req_quantite - quantity;

        db.query(sql_nom, [produit_id], (err, data) => {
          if (err) {
            console.log(err);
            reject({ error: "Internal Server Error" });
          }

          const resultArray = data.map((row) => [
            row.nomenclature,
            row.quantite,
            row.operation,
          ]);

          // Promises for each additional query
          const promises = resultArray.map((element) => {
            const [nomenclature, req_quantite, operation] = element;
            return new Promise((resolveOp, rejectOp) => {
              db.query(sql_select, [nomenclature], (err, dataS) => {
                if (err) {
                  console.error("Error in additional query", err);
                  rejectOp({ error: "Internal Server Error" });
                }

                let produit = dataS[0]?.Nom || 0;
                let stock_quantite = dataS[0]?.Quantite || 0;
                let stock_p = dataS[0]?.Stock || 0; // Only selects the first one

                db.query(sql_op, [operation], (err, dataOp) => {
                  if (err) {
                    console.error("Error", err);
                    return res.json("Error");
                  }

                  let op_nom = dataOp[0]?.operation || 0;
                  let op_duration = dataOp[0]?.duration || 0;
                  //let duration = op_data[0]?.duration || 0;

                  resolveOp([
                    produit_id,
                    produit,
                    req_quantite,
                    stock_quantite,
                    op_nom,
                    op_duration,
                    values[0][1],
                    produit_stock,
                    produit_stock === stock_p,
                    resteAFabriquer,
                    quantity,
                  ]);
                });
              });
            });
          });

          // Wait for all promises to resolve
          Promise.all(promises)
            .then((ordersCheck) => {
              // Now op_Check is populated
              console.log("Order : ", ordersCheck);
              resolve(ordersCheck);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    });
  }

  // Execute queries
  getStocks()
    .then((ordersCheck) => {
      res.json(ordersCheck);
    })
    .catch((error) => {
      console.log("Error", error);
      res.status(500).json(error);
    });
});

app.get("/get_orders_menu", (req, res) => {
  const sql = "SELECT Nom FROM `produits` WHERE Categorie='Produit'";

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.get("/get_orders", (req, res) => {
  const sql = "SELECT order_id,product,started,duration FROM `orders`";
  const sql_nom = "Select Nom from produits WHERE produit_id = ?";

  function getOrders() {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, data) => {
        if (err) {
          console.log("Error", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const resultArray = data.map((row) => [
          row.order_id,
          row.product,
          row.started,
          row.duration,
        ]);

        // Promises for each additional query
        const promises = resultArray.map((element) => {
          const [order_id, product, started, duration] = element;
          return new Promise((resolveOp, rejectOp) => {
            db.query(sql_nom, [product], (err, dataNom) => {
              if (err) {
                console.error("Error in additional query", err);
                rejectOp({ error: "Internal Server Error" });
              }
              let nom = dataNom[0]?.Nom || 0;
              resolveOp({
                order_id: order_id,
                product: nom,
                started: started,
                duration: duration,
              });
            });
          });
        });
        Promise.all(promises)
          .then((Orders) => {
            //console.log(Orders);
            resolve(Orders);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  getOrders()
    .then((orders) => {
      //console.log("orders ", orders);
      res.json(orders);
    })
    .catch((error) => {
      console.log("Error", error);
      res.status(500).json(error);
    });
});

// Graph :
app.post("/getFil", (req, res) => {
  const values = req.body;

  const sql =
    "SELECT s.Nom AS StockName, COUNT(*) AS Count FROM produits p JOIN stock s ON p.Stock = s.stock_id GROUP BY p.Stock;";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(data); // Check the console for the result
    return res.json(data);
  });
});

app.post("/delete_orders", (req, res) => {
  const ids = req.body;
  console.log(ids);

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.json("Invalid input");
  }

  const placeholders = ids.map(() => "?").join(", ");
  const sql = `DELETE FROM orders WHERE order_id IN (${placeholders})`;

  db.query(sql, ids, (err, data) => {
    if (err) {
      console.error("Error deleting rows:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.listen(8001, () => {
  console.log("listening on port 8001");
});
