var UserModel = require("./../models/User");

var viewUsers = function(fname, lname) {
  return new Promise(function(resolve, reject) {
    new UserModel()
      .where("fname", "like", `%${fname || ""}%`)
      .where("lname", "like", `%${lname || ""}%`)
      .fetchAll({ columns: ["fname", "lname", "username"] })
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

module.exports.viewUsers = viewUsers;
