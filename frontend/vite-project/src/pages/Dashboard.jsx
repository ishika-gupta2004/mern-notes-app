import { useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import API from "../services/api";
import { Navbar } from "../components/Navbar";

export default function Dashboard() {

  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [query, setQuery] = useState("");

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
    setNotes(notes.filter(n => n._id !== id));
  };

  const handleEdit = (note) => {
    setEditNote(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = async () => {
    const token = localStorage.getItem("token");
    await API.put(`/notes/${editNote}`, { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditNote(null);
    setTitle("");
    setContent("");
    fetchoNotes();
  };

  const togglePin = async (id) => {
    const token = localStorage.getItem("token");
    await API.put(`/notes/pin/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchoNotes();
  };

  const finalNotes = notes
    .filter(note => {
      if (!selectedDate) return true;
      const d = new Date(note.createdAt).toISOString().split("T")[0];
      return d === selectedDate;
    })
    .filter(note => {
      if (!query) return true;
      return (
        note.title?.toLowerCase().includes(query.toLowerCase()) ||
        note.content?.toLowerCase().includes(query.toLowerCase())
      );
    });

  const sortedNotes = [...finalNotes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white">

      <Navbar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        query={query}
        setQuery={setQuery}
      />

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Add Note</h2>
          <NoteForm refreshNotes={fetchoNotes} />
        </div>

        {/* Notes */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {sortedNotes.length === 0 && (
            <p className="text-gray-500">No notes found 📭</p>
          )}

          {sortedNotes.map((note) => (
            <div
              key={note._id}
              className="relative bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >

              {/* Pin */}
              <button
                onClick={() => togglePin(note._id)}
                className="absolute top-3 right-3 text-xl"
              >
                {note.isPinned ? "📌" : "📍"}
              </button>

              <h3 className="font-bold text-lg">{note.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{note.content}</p>

              {note.createdAt && (
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 hover:underline"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="bg-white w-[350px] p-6 rounded-2xl shadow-2xl">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Note</h3>
              <button onClick={() => setEditNote(null)}>✖</button>
            </div>

            <input
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditNote(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={updateNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}