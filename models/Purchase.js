var bookshelf = require("./../config/db").bookshelf;

var Purchase = bookshelf.Model.extend({
  tableName: "purchase"
});

module.exports = Purchase;
