var ProductModel = require("./../models/Product");

var addProducts = function(req, dict) {
  return new Promise(function(resolve, reject) {
    new ProductModel({
      asin: req.body.asin,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      group_name: req.body.group
    })
      .save()
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

module.exports.addProducts = addProducts;
