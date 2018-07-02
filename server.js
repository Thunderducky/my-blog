const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Auth related frameworks
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const cors = require('cors');

const Blog = require("./models/blog");

dotenv.config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE configured';
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: 'my-blog',
  issuer:`${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkWriteBlog = jwtAuthz(['write:blog' ]);

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions =  {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-blog");

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/blog", (req, res) => {
  console.log("this should be hit");
  Blog.find({}).sort({createdAt: -1}).then(results => res.json(results));
});
app.post("/api/blog", checkJwt, checkWriteBlog, (req, res) => {
  console.log(req.body);

  Blog.create(req.body).then(dbBlog => {
      res.json(dbBlog);
  })
})

// This is a catch all if no other routes are matched
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});



app.listen(PORT, function(){
  console.log(`API Server now listening on port ${PORT}`);
})
