const User = require('../../models/user')
const session = require('../../session/session')

const getUser = async () => {
  let user
  try {
    user = await User.findOne({ username: session.username }).exec()
  } catch (err) {
    console.log(err)
  }

  return user
}

module.exports = getUser