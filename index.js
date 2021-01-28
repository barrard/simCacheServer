var express = require("express");

var app = express();

let data = {};
app.use(express.json({ limit: "3000mb" })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.bodyParser({limit: '50mb'}));
var cors = require("cors");
app.use(cors());
//Save data
app.post("/save", function (req, res) {
  // console.log(req.body)
  console.log("data saved");
  data = req.body;
  res.json({ res: "hello world" });
});
//Get data
app.get("/get", function (req, res) {
  console.log("hit get");
  res.json(data);
});

//test
app.get("/test", function (req, res) {
  console.log("hit test");
  res.json({ ok: "ok" });
});

const PORT = 1338;

app.listen(PORT, function () {
  console.log(`sim data cache running on port ${PORT}`);
});
