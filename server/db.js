
const sqlite3 = require('sqlite3')

module.exports = new sqlite3.Database("./database.sqlite", err => console.log(err ? err : "Connected to database"))
