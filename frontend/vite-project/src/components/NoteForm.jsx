import { useState } from "react";
import API from "../services/api";
import "../styles/style.css"

export const NoteForm = ({ refreshNotes }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const addNote = async () => {
        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/notes",
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setContent("");

            refreshNotes();

        } catch (err) {
            alert("Error adding note ");
        }
    };

    return (
        // <div></div>
        <div className="flex flex-col gap-3">

            {/* Title */}
            <input
                value={title}
                placeholder="Enter title..."
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* Content */}
            <textarea
                value={content}
                placeholder="Write your note..."
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* Button */}
            <button
                onClick={addNote}
                className="bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
            >
                Add Note
            </button>

            <div className="working-girl"></div>

        </div>
    );
};