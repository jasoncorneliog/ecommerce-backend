var ProductModel = require("./../models/Product");

var modifyProduct = function(req, dict) {
  return new Promise(function(resolve, reject) {
    new ProductModel()
      .where({ asin: asin })
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

module.exports.modifyProduct = modifyProduct;
