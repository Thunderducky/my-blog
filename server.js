const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const mongoose = require("mongoose");
const dotenv = require("dotenv");

const db = require("./models");

// Auth related frameworks
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const cors = require('cors');

//const Blog = require("./models/blog");

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

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-blog");

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/blog", (req, res) => {
  console.log(req.user);
  console.log("this should be hit");
  //Blog.find({}).sort({createdAt: -1}).then(results => res.json(results));
  //res.json([{id: 1, title: "test", body: "test"}])
  db.Blog.findAll({include:[db.Author]}).then((dbBlog) => {
    console.log(dbBlog);
    res.json(dbBlog);
  })
});
app.post("/api/blog", checkJwt, (req, res) => {
  console.log(req.user);

  // Format
  // Check if that author already exists
  // if they don't, create one,
  // if they do, use the one we found
  db.Author.findOne({
    where: {
      external_id: req.user.sub
    }
  }).then((user) => {
    console.log("\n\n___ USER ____\n\n");
    if(user === null){
      console.log("\n\n___ NO USER _____\n\n");
      db.Author.create({
        external_id: req.user.sub,
        nickname: "a new nickname " + Math.floor(Math.random()*1000)
      }).then((newUser) => {
        console.log("\n\n____ NEW USER CREATED ____\n\n");
        console.log(newUser);
        console.log("end");
        req.body.AuthorId = newUser.id;
        db.Blog.create(req.body).then((dbBlog) => {
          console.log("POSTED");
          console.log(dbBlog);
          res.json(dbBlog);
          console.log("end");
        });
      });
    }
    else {

      console.log("\n\n------USER FOUND------\n\n");
      req.body.AuthorId = user.id;
      db.Blog.create(req.body).then((dbBlog) => {
        console.log(dbBlog);
        res.json(dbBlog);
      });
    }
  });
})

// This is a catch all if no other routes are matched
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function(){
    console.log(`API Server now listening on port ${PORT}`);
  })
})
