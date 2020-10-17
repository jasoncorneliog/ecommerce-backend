var DBConfig = {
  client: "sqlite3",
  connection: {
    filename: "ecommerce-backend.sqlite3"
  },
  useNullAsDefault: true
};

var knex = require("knex")(DBConfig);
var bookshelf = require("bookshelf")(knex);

module.exports.bookshelf = bookshelf;
