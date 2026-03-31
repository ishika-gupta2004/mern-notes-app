const Note = require("../models/Note")

exports.createNote = async (req, res) => {

    try {

        const { title, content, tags } = req.body

        const note = await Note.create({

            user: req.user,
            title,
            content,
            tags

        })

        res.json(note)

    } catch (err) {

        res.status(500).json(err)

    }

}

exports.getNotes = async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.user
        }).sort({isPinned: -1, createdAt: -1})

        res.json(notes)


    } catch (err) {

        res.status(500).json(err)

    }

}

exports.deleteNote = async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id)

        res.json("Note Deleted")

    } catch (err) {

        res.status(500).json(err)

    }

}

exports.updateNote = async (req, resp) => {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
    )
    resp.json(note);
}

exports.togglePin = async (req, resp) => {
    try {
        const note = await Note.findById(req.params.id);
        note.isPinned = !note.isPinned;
        await note.save();
        resp.json(note)
    } catch (err) {
        resp.status(500).json(err);

    }
}