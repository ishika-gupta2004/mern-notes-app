import { useState } from "react";
import API from "../services/api";

export const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");

    const addNote = async () => {
        const token = localStorage.getItem("token");

        await API.post("/notes", {
            title,
            content
        },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        alert("Notes Added")
    }

    return (
        <>
            <div><input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

                <input
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={addNote}>
                    Add Note
                </button>

            </div>

        </>
    )
}