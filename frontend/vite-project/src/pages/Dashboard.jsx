import { useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import API from "../services/api";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Navbar } from "../components/Navbar";

export default function Dashboard() {

  const gradients = [
    "from-pink-400 to-purple-500",
    "from-indigo-400 to-blue-500",
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-cyan-400 to-blue-400",
    "from-fuchsia-500 to-pink-500"
  ];

  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [query, setQuery] = useState("");
  const [viewNote, setViewNote] = useState(null);

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
    <div className="lg:h-screen w-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-white">

      <Navbar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        query={query}
        setQuery={setQuery}
      />

      <div className="lg:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">

        {/* Sidebar */}
        <div className=" bg-white p-4 lg:rounded-2xl shadow overflow-auto">
          <h2 className="hidden lg:block text-lg font-semibold mb-4">Add Note</h2>
          <NoteForm refreshNotes={fetchoNotes} />
        </div>

        {/* Notes */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto p-3 items-star">

          {sortedNotes.length === 0 && (
            <p className="text-gray-500">No notes found 📭</p>
          )}

          {sortedNotes.map((note, index) => (
            <div
              key={note._id}
              onClick={() => setViewNote(note)}
              className={`relative p-4 h-[120px] lg:h-[180px] overflow-hidden rounded-xl shadow-lg text-white bg-gradient-to-br ${gradients[index % gradients.length]} hover:scale-105 transition duration-300`}            >

              {/* Pin */}
              <button
                onClick={() => togglePin(note._id)}
                className="absolute top-3 right-3 text-xl"
              >
                {note.isPinned ? "📌" : "📍"}
              </button>

              <h3 className="font-bold text-lg line-clamp-1">{note.title}</h3>
              <p className="text-lg text-black mt-2 line-clamp-1 lg:line-clamp-2">{note.content}</p>

              {note.createdAt && (
                <p className="hidden lg:block text-xs text-black mt-2">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => {e.stopPropagation(); deleteNote(note._id)}}
                  className="text-red-500 hover:underline"
                >
                  <FiTrash2 className="text-white text-lg" />
                </button>

                <button
                  onClick={(e) => {e.stopPropagation();handleEdit(note)}}
                  className="text-white
                   hover:underline"
                >
                  <FiEdit className="text-white text-lg" />

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

      {viewNote && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

          <div className="bg-white w-[90%] max-w-lg h-auto
           rounded-2xl p-5 overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{viewNote.title}</h2>
              <button onClick={() => setViewNote(null)}>✖</button>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap">
              {viewNote.content}
            </p>

            <p className="text-xs text-gray-400 mt-4">
              {new Date(viewNote.createdAt).toLocaleString()}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}