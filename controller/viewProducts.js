var ProductModel = require("./../models/Product");

var viewProducts = function(asin, keyword, group) {
  return new Promise(function(resolve, reject) {
    if (asin == undefined) {
      new ProductModel()
        .where(function() {
          this.where("productName", "like", `%${keyword || ""}%`).orWhere(
            "productDescription",
            "like",
            `%${keyword || ""}%`
          );
        })
        .where("group_name", "like", `%${group || ""}%`)
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
    } else {
      new ProductModel()
        .where(function() {
          this.where("productName", "like", `%${keyword || ""}%`).orWhere(
            "productDescription",
            "like",
            `%${keyword || ""}%`
          );
        })
        .where("asin", asin)
        .where("group_name", "like", `%${group || ""}%`)
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
    }
  });
};

module.exports.viewProducts = viewProducts;
