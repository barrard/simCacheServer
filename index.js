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

getDataFromFile();
async function getDataFromFile() {
  data = await fs.readFile("./cache.json", "utf8");
  data = JSON.parse(data);
  console.log(data);
}
// getDataFromRemote();
//get data from Jt
async function getDataFromRemote() {
  try {
    let IP = "192.168.1.3";
    console.log(`Fetching from remote cache server ${IP}`);
    data = await rp(`http://${IP}:1338/get`);
    if (!data) return;
    await fs.writeFile("./cache.json", data, "utf8");
    console.log("success!");
    data = JSON.parse(data);
  } catch (err) {
    console.log("Error trying to fetch from a remote cache server.");
    // console.error(err);
  }
}
//Save data
app.post("/save", async function (req, res) {
  // console.log(req.body)
  data = req.body;
  await fs.writeFile("./cache.json", data, "utf8");

  console.log("data saved");
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
