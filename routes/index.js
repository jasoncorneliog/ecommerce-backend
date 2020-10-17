var express = require("express");
var router = express.Router();
var uuid = require("uuid-random");

/* Function calls */
var register = require("./../controller/registerUser");
var login = require("./../controller/login");
var update = require("./../controller/updateInfo");
var add = require("./../controller/addProducts");
var modify = require("./../controller/modifyProduct");
var viewuser = require("./../controller/viewUsers");
var viewproduct = require("./../controller/viewProducts");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Register the user */
router.post("/registerUser", function(req, res, next) {
  fname = req.body.fname;
  lname = req.body.lname;
  address = req.body.address;
  city = req.body.city;
  state = req.body.state;
  zip = req.body.zip;
  email = req.body.email;
  username = req.body.username;
  password = req.body.password;

  /* If any of the fields is missing, return error. */
  if (
    username == undefined ||
    fname == undefined ||
    lname == undefined ||
    address == undefined ||
    city == undefined ||
    state == undefined ||
    zip == undefined ||
    email == undefined ||
    password == undefined
  ) {
    res.json({ message: "The input you provided is not valid" });
    return;
  }

  register
    .registerUser(req)
    .then((user) => {
      return res.json({
        message: user.get("fname") + " was registered successfully"
      });
    })
    .catch((err) => {
      return res.json({ message: "The input you provided is not valid" });
    });
});

/* Login */
router.post("/login", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == undefined || password == undefined) {
    res.json({
      message:
        "There seems to be an issue with the username/password combination that you entered"
    });
    return;
  } else if (username == "jadmin" && password == "admin") {
    var first_name = "Jenny";
    req.session.admin = username;
    req.session.user = username;
    res.json({ message: "Welcome " + first_name });
    return;
  } else {
    login
      .loginUser(req)
      .then((user) => {
        req.session.user = username;
        return res.json({ message: "Welcome " + user.get("fname") });
      })
      .catch((err) => {
        return res.json({
          message:
            "There seems to be an issue with the username/password combination that you entered"
        });
      });
  }
});

/* Logout */
router.post("/logout", function(req, res, next) {
  if (req.session.user != undefined) {
    req.session.destroy();
    res.json({ message: "You have been successfully logged out" });
  } else {
    res.json({ message: "You are not currently logged in" });
  }
});

/* Update contact info */
router.post("/updateInfo", function(req, res, next) {
  fname = req.body.fname;
  lname = req.body.lname;
  address = req.body.address;
  city = req.body.city;
  state = req.body.state;
  zip = req.body.zip;
  email = req.body.email;
  username = req.body.username;
  password = req.body.password;

  if (req.session.user == undefined) {
    res.json({ message: "You are not currently logged in" });
    return;
  }

  var dict = {};

  var checkuser = 0;

  if (fname != undefined) {
    dict.fname = fname;
  }
  if (lname != undefined) {
    dict.lname = lname;
  }
  if (address != undefined) {
    dict.address = address;
  }
  if (city != undefined) {
    dict.city = city;
  }
  if (state != undefined) {
    dict.state = state;
  }
  if (zip != undefined) {
    dict.zip = zip;
  }
  if (email != undefined) {
    dict.email = email;
  }
  if (username != undefined) {
    dict.username = username;
  }
  if (password != undefined) {
    dict.password = password;
  }

  update
    .updateInfo(req, dict)
    .then((model) => {
      return res.json({
        message:
          model.get("fname") + " your information was successfully updated"
      });
    })
    .catch((err) => {
      return res.json({ message: "The input you provided is not valid" });
    });
});

/* Add products */
router.post("/addProducts", function(req, res, next) {
  asin = req.body.asin;
  productName = req.body.productName;
  productDescription = req.body.productDescription;
  group = req.body.group;

  if (req.session.user == undefined) {
    res.json({ message: "You are not currently logged in" });
    return;
  } else if (req.session.admin == undefined) {
    res.json({ message: "You must be an admin to perform this action" });
    return;
  } else if (
    /* If any of the fields is missing, return error. */
    asin == undefined ||
    productName == undefined ||
    productDescription == undefined ||
    group == undefined
  ) {
    res.json({ message: "The input you provided is not valid" });
    return;
  } else {
    add
      .addProducts(req)
      .then((model) => {
        return res.json({
          message:
            model.get("productName") + " was successfully added to the system"
        });
      })
      .catch((err) => {
        return res.json({ message: "The input you provided is not valid" });
      });
  }
});

/* Modify products */
router.post("/modifyProduct", function(req, res, next) {
  asin = req.body.asin;
  productName = req.body.productName;
  productDescription = req.body.productDescription;
  group = req.body.group;

  dict = {};

  if (req.session.user == undefined) {
    res.json({ message: "You are not currently logged in" });
    return;
  } else if (req.session.admin == undefined) {
    res.json({ message: "You must be an admin to perform this action" });
    return;
  } else if (
    /* If any of the fields is missing, return error. */
    asin == undefined ||
    productName == undefined ||
    productDescription == undefined ||
    group == undefined
  ) {
    res.json({ message: "The input you provided is not valid" });
    return;
  } else {
    dict["productName"] = productName;
    dict["productDescription"] = productDescription;
    dict["group_name"] = group;

    modify
      .modifyProduct(req, dict)
      .then((model) => {
        return res.json({
          message: model.get("productName") + " was successfully updated"
        });
      })
      .catch((err) => {
        return res.json({ message: "The input you provided is not valid" });
      });
  }
});

/* View Users */
router.post("/viewUsers", function(req, res, next) {
  fname = req.body.fname;
  lname = req.body.lname;

  if (req.session.user == undefined) {
    res.json({ message: "You are not currently logged in" });
    return;
  } else if (req.session.admin == undefined) {
    res.json({ message: "You must be an admin to perform this action" });
    return;
  } else {
    viewuser
      .viewUsers(fname, lname)
      .then((model) => {
        if (model === undefined || model.length == 0) {
          return res.json({
            message: "There are no users that match that criteria"
          });
        }
        return res.json({ message: "The action was successful", user: model });
      })
      .catch((err) => {
        return res.json({
          message: "There are no users that match that criteria"
        });
      });
  }
});

/* View Products */
router.post("/viewProducts", function(req, res, next) {
  asin = req.body.asin;
  keyword = req.body.keyword;
  group = req.body.group;

  viewproduct
    .viewProducts(asin, keyword, group)
    .then((model) => {
      if (model === undefined || model.length == 0) {
        return res.json({
          message: "There are no products that match that criteria"
        });
      }
      return res.json({ product: model });
    })
    .catch((err) => {
      return res.json({
        message: "There are no products that match that criteria"
      });
    });
});

/* Purchase products */
router.post("/buyProducts", function(req, res, next) {
  products = req.body.products;

  if (req.session.user == undefined) {
    res.json({ message: "You are not currently logged in" });
    return;
  }

  purchase_id = uuid();

  viewproduct
    .viewProducts(asin, keyword, group)
    .then((model) => {
      if (model === undefined || model.length == 0) {
        return res.json({
          message: "There are no products that match that criteria"
        });
      }
      return res.json({ product: model });
    })
    .catch((err) => {
      return res.json({
        message: "There are no products that match that criteria"
      });
    });
});

module.exports = router;
