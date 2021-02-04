var express = require("express");
var rp = require("request-promise");
var fs = require("fs-extra");
var app = express();

let data = {};
app.use(express.json({ limit: "3000mb" })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.bodyParser({limit: '50mb'}));
var cors = require("cors");
app.use(cors());

getDataFromRemote();
//get data from Jt
async function getDataFromRemote() {
  data = await rp("http://192.168.1.13:1338/get");
  // data = JSON.parse(data);
  if (!data) return;
  try {
    await fs.writeFile("./cache.json", data, "utf8");
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}
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
