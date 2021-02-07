const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const async = require("async");
// const fileUpload = require("express-fileupload");
// const multer = require("multer");
const fs = require("fs");

app.use(bodyParser.json());
module.exports = app;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json({ type: "application/json" }));

let ingredientDB = new Datastore({
  filename: process.env.APPDATA + "/POS/server/databases/ingredient.db",
  autoload: true,
});

ingredientDB.ensureIndex({ fieldName: "_id", unique: true });

app.get("/", function (req, res) {
  res.send("Ingredient API");
});

// app.get("/ingredient", function (req, res) {
//   ingredientDB.find({}, function (err, docs) {
//     res.send(docs);
//   });
// });

// app.get("/save", function (req, res) {
//   let myData = req.body;

//   res.send("kljk");
//   console.log(myData);
// });

//   app.post("/ingredient", upload.single("imagename"), function (req, res) {

app.post("/save", function (req, res) {
  console.log(req.body);
  //   console.log(req.is("json"));

  let Ingredient = {
    _id: parseInt(req.body.id),

    // quantity: req.body.quantity == "" ? 0 : req.body.quantity,
    name: req.body.name,
    unitType: req.body.unitType,
    stock: req.body.stock == "on" ? 0 : 1,
  };

  //   console.log(Ingredient);

  ingredientDB.insert(Ingredient, function (err, ingredient) {
    if (err) res.status(500).send(err);
    else res.send(ingredient);
  });

  //   if (req.body.id == "") {
  //     Ingredient._id = Math.floor(Date.now() / 1000);
  //     ingredientDB.insert(Ingredient, function (err, ingredient) {
  //       if (err) res.status(500).send(err);
  //       else res.send(ingredient);
  //     });
  //   } else {
  //     ingredientDB.update(
  //       {
  //         _id: parseInt(req.body.id),
  //       },
  //       Ingredient,
  //       {},
  //       function (err, numReplaced, ingredient) {
  //         if (err) res.status(500).send(err);
  //         else res.sendStatus(200);
  //       }
  //     );
  //   }
});
