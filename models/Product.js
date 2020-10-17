var bookshelf = require("./../config/db").bookshelf;

var Product = bookshelf.Model.extend({
  tableName: "products"
});

module.exports = Product;
