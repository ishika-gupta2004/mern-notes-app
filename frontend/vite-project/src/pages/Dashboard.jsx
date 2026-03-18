import { useEffect, useState } from "react"
import { NoteForm } from "../components/NoteForm"
import "../styles/style.css"
import API from "../services/api";


function Dashboard() {

    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")


    const fetchoNotes = async () => {
        const token = localStorage.getItem("token");
        const res = await API.get("/notes", {
            headers: { Authorization: `Bearer ${token}` }
        })
        setNotes(res.data);
    }

    useEffect(() => {
        fetchoNotes();
    }, []);

    const deleteNote = async (id) => {

        const token = localStorage.getItem("token")

        await API.delete(`/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setNotes(notes.filter(note => note._id !== id))

    }

    const handleEdit = (note) => {
        setEditNote(note._id)
        setTitle(note.title)
        setContent(note.content)
    }

    const updateNote = async () => {

        const token = localStorage.getItem("token")

        await API.put(`/notes/${editNote}`,
            {
                title,
                content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setEditNote(null)
        setTitle("")
        setContent("")

        fetchoNotes()

    }

    return (
        <div>

            <div className="navbar">
                My Notes App
            </div>

            <div className="dashboard">

                <div className="form">
                    <NoteForm refreshNotes={fetchoNotes} />
                </div>

                <div className="notes-container">
                    {notes.map((note) => (
                        <div className="note" key={note._id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>

                            <button
                                className="delete-btn"
                                onClick={() => deleteNote(note._id)}
                            >
                                Delete
                            </button>

                            <button onClick={() => handleEdit(note)}>
                                Edit
                            </button>

                        </div>
                    ))}
                </div>

            </div>
            {editNote && (
                <div className="modal">

                    <div className="modal-content">

                        <h3>Edit Note</h3>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <button onClick={updateNote}>
                            Update
                        </button>

                        <button onClick={() => setEditNote(null)}>
                            Cancel
                        </button>

                    </div>

                </div>
            )}

        </div>
    )

}

export default Dashboard