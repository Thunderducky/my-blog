const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.listen(PORT, function(){
  console.log(`API Server now listening on port ${PORT}`);
})
