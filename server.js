const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/test", (req, res) => {
  res.json(true);
});
app.post("/api/test", (req, res) => {
  console.log(req.body);
  req.body.received = true;
  res.json(req.body);
})

// This is a catch all if no other routes are matched
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, function(){
  console.log(`API Server now listening on port ${PORT}`);
})
