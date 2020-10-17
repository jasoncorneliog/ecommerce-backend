var UserModel = require("./../models/User");

var loginUser = function(req) {
  return new Promise(function(resolve, reject) {
    new UserModel({ username: req.body.username, password: req.body.password })
      .fetch()
      .then(function(model) {
        if (!model) {
          reject(Error("Fail"));
        }
        resolve(model);
      })
      .catch((error) => {
        reject(Error("Fail"));
      });
  });
};

module.exports.loginUser = loginUser;
