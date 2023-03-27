const user = require("../../models/user")
const session = require("../../session/session")

const removeFromFavourites = async (req, res) => {
    const { item } = req.body

    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    existingUser.favourites = existingUser.favourites.filter((x) => {
        return x !== item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = removeFromFavourites