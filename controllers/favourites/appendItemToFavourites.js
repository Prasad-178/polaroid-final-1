const user = require("../../models/user")
const session = require("../../session/session")

const addToFavourites = async (req, res) => {
    const { item } = req.body
    
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    if (user.favourites.length >= 4) {
        console.log("Favourites list is full, cannot add any more items!")
        return
    }
    existingUser.favourites.push(item)

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = addToFavourites