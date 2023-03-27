const user = require("../../models/user")
const session = require("../../session/session")

const unFollow = async (req, res) => {
    const { username } = req.body

    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return
    }

    existingUser.following.filter((x) => {
        return x!==username
    })

    let otherUser
    try {
        otherUser = await user.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
    }

    otherUser.followers.filter((x) => {
        return x!==session.username
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
    }

    try {
        await otherUser.save()
    } catch (err) {
        console.log(err)
    }

    return
}

module.exports = unFollow