const express = require("express");
const app = express();
const mongoUrl = require("./config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const unisRoute = require("./api/routes/universities");
const indexRoute = require("./api/routes/index");

app.use(express.static("public"));

mongoose.connect(mongoUrl.url, { useNewUrlParser: true });
//funnel all requests through morgan for logging requests on the console
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Preventing CORS errors
//We need to append headers before the response is sent back to the client
//these headers tell the browser that we allow a client that has a different origin from the server to get the repsonse.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* here means every origin is allowed, You can restrict this to specific ips like 'http:/website.com
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  //The options request which is an HTTP method is always sent first and once by the browser
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

//Any request directed to /universities will be sent to unisRoute
app.use("/universities", unisRoute);
app.use("/", indexRoute);
app.set("view engine", "ejs");
//if you reach this line that means no route in universties was able to handle the request therefore we catch the error here
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  //forward the error;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
