var ProductModel = require("./../models/Product");

var viewProducts_asin = function(asin) {
  return new Promise(function(resolve, reject) {
    new ProductModel()
      .where("asin", asin)
      .fetchAll({ columns: ["asin", "productName"] })
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

module.exports.viewProducts_asin = viewProducts_asin;
