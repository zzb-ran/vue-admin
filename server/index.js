const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const jwtSecret = "node"; // jwt生成密钥

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
  // do something...
});

app.post("/login", function (req, res) {
  res.cookie(
    "sign",
    jwt.sign(
      {
        ...req.body,
        expires: new Date(new Date().getTime() + (24 + 8) * 60 * 60 * 1000),
      },
      jwtSecret
    ),
    {
      expires: new Date(new Date().getTime() + (24 + 8) * 60 * 60 * 1000),
    }
  );
  res.send({
    ...req.body,
    status: 200,
    expires: 24 * 60 * 60,
    token: jwt.sign(req.body, jwtSecret),
  });
});

app.get("/reloadToken", function (req, res) {
  const userInfo = jwt.verify(req.cookies.sign, jwtSecret);
  if (
    new Date(userInfo.expires).getTime() - new Date().getTime() <
    3600 * 1000
  ) {
    // token有效期少于1小时刷新token
    res.cookie(
      "sign",
      jwt.sign(
        {
          ...userInfo,
          expires: new Date(new Date().getTime() + (24 + 8) * 60 * 60 * 1000),
        },
        jwtSecret
      ),
      {
        expires: new Date(new Date().getTime() + (24 + 8) * 60 * 60 * 1000),
      }
    );
    res.send({
      status: 200,
      message: "Token刷新成功",
      expires: 24 * 60 * 60,
      token: jwt.sign(userInfo, jwtSecret),
    });
  } else {
    // 不小与1小时返回ok
    res.send("ok");
  }
});

app.listen("8888");
