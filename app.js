var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var bodyParser = require('body-parser');
var session = require("express-session");

var indexRouter = require("./routes/index");

var app = express();

// Port
var PORT = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "bigsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900000 },
    rolling: true
  })
);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// App server to listen to port 9000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

module.exports = app;
