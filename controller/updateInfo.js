var UserModel = require("./../models/User");

var updateInfo = function(req, dict) {
  return new Promise(function(resolve, reject) {
    new UserModel()
      .where({ username: req.session.user })
      .save(dict, { patch: true })
      .then(function(model) {
        if (!model) {
          console.log(model);
          reject(Error("Fail"));
        }
        resolve(model);
      })
      .catch((error) => {
        console.log(error);
        reject(Error("Fail"));
      });
  });
};

module.exports.updateInfo = updateInfo;
