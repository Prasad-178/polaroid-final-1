const dotenv = require('dotenv')

dotenv.config()

const variables = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    port: process.env.PORT,
    jwt_secret: process.env.SECRET
}

module.exports = variables