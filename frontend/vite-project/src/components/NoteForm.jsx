import { useState } from "react";
import bg from "../assets/working-girl.png";

import API from "../services/api";

export const NoteForm = ({ refreshNotes }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const addNote = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!title.trim() || !content.trim()) return;

            await API.post(
                "/notes",
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setContent("");
            refreshNotes();
        } catch (err) {
            alert("Error adding note");
        }
    };

    return (
        <div className="bg-white/70 h-[40vh] lg:h-auto overflow-hidden backdrop-blur-xl shadow-xl rounded-2xl p-4 flex justify-center items-star flex-col gap-4 border border-gray-200">

            {/* Heading */}
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                ✍️ Add New Note
            </h2>

            {/* Title */}
            <input
                value={title}
                placeholder="Enter title..."
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* Content */}
            <textarea
                value={content}
                placeholder="Write your note..."
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
            />

            {/* Button */}
            <button
                onClick={addNote}
                className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
            >
                + Add Note
            </button>

            {/* <div className="working-girl w-[40vw] h-[30vh]"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}></div> */}
        </div>
    );
};