const Note = require('../..models/note')

module.exports = {
    index,
}

function index() {

}

async function create(req, res) {
    req.body.user = req.user_id
    const note = await Note.create(req.body)
    res.json(note)
}

