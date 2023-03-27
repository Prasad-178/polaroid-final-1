const list = require("../../models/list")
const session = require("../../session/session")

const deleteFromList = async (req, res) => {
    const { listName, listItem } = req.body

    let existingList
    try {
        existingList = await list.findOne({ createdBy: session.username, listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    if (!existingList) {
        console.log("No such list exists!")
        return
    }

    existingList = existingList.items.filter((x) => {
        return x !== item
    })

    try {
        await existingList.save()
    } catch (err) {
        console.log(err)
        return
    }
    
    return
}

module.exports = deleteFromList