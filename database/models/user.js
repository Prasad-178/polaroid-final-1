const db = require('../create')

const sql = "CREATE TABLE IF NOT EXISTS user (username varchar(50) unique, email varchar(50) primary key, bio varchar(150), password varchar(50) not null)"

const createUserTable = () => {
    db.serialize(() => {
        db.run(sql)
        console.log("Created user table successfully!")

        // db.all("select * from user", (err, res) => {
        //     console.log(res) 
        // })
    })
}

module.exports = createUserTable