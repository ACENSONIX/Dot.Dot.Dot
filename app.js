const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

app.use('', require('./routes/user'));
app.use('', require('./routes/cafe'));
app.use('', require('./routes/work'));

app.use(express.static("public"));


//Requiring all table relationship
require("./utils/allTableRelationship");



app.listen(process.env.PORT, () => {
  console.log("===============================");
  console.log(`API listening on port ${process.env.PORT}`);
  console.log("===============================");
});