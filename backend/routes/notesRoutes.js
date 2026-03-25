const router = require("express").Router()

const auth = require("../middleware/authMiddleware")

const {createNote,getNotes, deleteNote, updateNote,togglePin} = require("../controllers/notesController")

router.post("/", auth, createNote)

router.get("/", auth, getNotes)

router.delete("/:id", auth, deleteNote)
router.put("/:id", auth, updateNote)
router.put("/pin/:id", auth, togglePin);


module.exports = router