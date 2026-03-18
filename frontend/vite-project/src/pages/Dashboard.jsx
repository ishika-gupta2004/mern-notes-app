import { useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const fetchoNotes = async () => {
        const token = localStorage.getItem("token");
        const res = await API.get("/notes", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(res.data);
    };

    useEffect(() => {
        fetchoNotes();
    }, []);

    const deleteNote = async (id) => {
        const token = localStorage.getItem("token");

        await API.delete(`/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setNotes(notes.filter(note => note._id !== id));
    };

    const handleEdit = (note) => {
        setEditNote(note._id);
        setTitle(note.title);
        setContent(note.content);
    };

    const updateNote = async () => {
        const token = localStorage.getItem("token");

        await API.put(
            `/notes/${editNote}`,
            { title, content },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        setEditNote(null);
        setTitle("");
        setContent("");
        fetchoNotes();
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <div className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white shadow-md">
                <h1 className="text-xl font-bold">📝 Notes App</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {/* Main */}
            <div className="p-6 grid md:grid-cols-3 gap-6">

                {/* Form */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Add Note</h2>
                    <NoteForm refreshNotes={fetchoNotes} />
                </div>

                {/* Notes */}
                <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="font-bold text-lg text-gray-800">
                                {note.title}
                            </h3>

                            <p className="text-gray-600 text-sm mt-2">
                                {note.content}
                            </p>

                            <div className="flex justify-between mt-4">

                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleEdit(note)}
                                    className="text-indigo-500 text-sm hover:underline"
                                >
                                    Edit
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {editNote && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                    <div className="bg-white p-6 rounded-xl w-[300px] shadow-lg">

                        <h3 className="text-lg font-bold mb-4">Edit Note</h3>

                        <input
                            className="w-full mb-3 px-3 py-2 border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            className="w-full mb-3 px-3 py-2 border rounded"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={updateNote}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => setEditNote(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Dashboard;