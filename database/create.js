const sqlite3 = require('sqlite3')
const path = require('path')

const db_name = path.join(__dirname, "data", "Polaroid.db")
const db = new sqlite3.Database(db_name, (err) => {
    if (err) return console.log(err)

    console.log("Database created!!")
})

module.exports = db