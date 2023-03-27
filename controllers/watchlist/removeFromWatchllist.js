const user = require("../../models/user")
const session = require("../../session/session")

const removeFromWatchlist = async (req, res) => {
    const { item } = req.body

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

    existingUser.planToWatch.filter((x) => {
        return x!==item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
    }

    return
}

module.exports = removeFromWatchlist