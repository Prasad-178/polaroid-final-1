const List = require('../../models/list')
const session = require('../../session/session')

const appendToList = async (req, res) => {
    const { listName, listItem } = req.body

    let existingList
    try {
        existingList = await List.findOne({ listName: listName, createdBy: session.username }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingList) {
        console.log("No such list exists!")
        return
    }

    existingList.items.push(listItem)

    try {
        existingList.save() 
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = appendToList