var express = require("express");

var app = express();

let data = {};
app.use(express.json({ limit: "3000mb" })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.bodyParser({limit: '50mb'}));
var cors = require("cors");
app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.post("/save", function (req, res) {
  // console.log(req.body)
  console.log("data saved");
  data = req.body;
  res.json({ res: "hello world" });
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/get", function (req, res) {
  console.log("hit get");
  res.json(data);
});

const PORT = 1338;

app.listen(PORT, function () {
  console.log(`sim data cache running on port ${PORT}`);
});
