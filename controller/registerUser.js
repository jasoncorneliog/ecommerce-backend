var UserModel = require("./../models/User");

/* Check if user already exists in DB. If yes, return error. Else, add to DB. */

var registerUser = function(req) {
  return new Promise(function(resolve, reject) {
    new UserModel({
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .save()
      .then(function(u) {
        if (!u) {
          reject(Error("Fail"));
        }
        resolve(u);
      })
      .catch((error) => {
        reject(Error("Fail"));
      });
  });
};

module.exports.registerUser = registerUser;
