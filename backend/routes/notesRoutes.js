const router = require("express").Router()

const auth = require("../middleware/authMiddleware")

const {createNote,getNotes, deleteNote, updateNote} = require("../controllers/notesController")

router.post("/", auth, createNote)

router.get("/", auth, getNotes)

router.delete("/:id", auth, deleteNote)
router.put("/:id", auth, updateNote)

module.exports = router