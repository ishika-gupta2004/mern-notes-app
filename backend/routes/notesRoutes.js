const router = require("express").Router()

const auth = require("../middleware/authMiddleware")

const {

    createNote,
    getNotes,
    deleteNote

} = require("../controllers/notesController")

router.post("/", auth, createNote)

router.get("/", auth, getNotes)

router.delete("/:id", auth, deleteNote)

module.exports = router