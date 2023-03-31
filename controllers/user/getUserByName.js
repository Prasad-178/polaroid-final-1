const User = require('../../models/user')

const getUserByName = async (name) => {
  let user
  try {
    user = await User.findOne({ username: name }).exec()
  } catch (err) {
    console.log(err)
  }

  return user
}

module.exports = getUserByName