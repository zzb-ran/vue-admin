const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/register", function (req, res) {
  console.log(req.body);
  res.cookie("sign", jwt.sign(req.body, "node"), {
    maxAge: 5000,
  });
  res.send({ ...req.body, token: jwt.sign(req.body, "node") });
});

app.post("/login", function (req, res) {
  console.log(req.cookies);
  res.send({
    cookie: req.cookies,
  });
});

app.listen("8888");
