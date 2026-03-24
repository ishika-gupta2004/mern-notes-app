import { useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import API from "../services/api";
import { Navbar } from "../components/Navbar";

function Dashboard() {

  const gradients = [
    "from-pink-100 to-pink-200",
    "from-purple-100 to-purple-200",
    "from-blue-100 to-blue-200",
    "from-green-100 to-green-200",
    "from-yellow-100 to-yellow-200",
    "from-orange-100 to-orange-200",
    "from-indigo-100 to-indigo-200",
  ];

  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [query, setQuery] = useState("");

  // fetch notes
  const fetchoNotes = async () => {
    try {
      console.log("Fetching notes...");

      const token = localStorage.getItem("token");
      console.log("TOKEN 👉", token);

      const res = await API.get("/notes", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("API DATA 👉", res.data);

      setNotes(res.data);

    } catch (err) {
      console.log("ERROR 👉", err);
    }
  };

  useEffect(() => {
    fetchoNotes();
  }, []);

  // delete
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  // edit
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

  // const filteredNotes = selectedDate ? notes.filter(note => {
  //   const noteDate = new Date(note.createdAt).toISOString().split("T")[0];
  //   return noteDate === selectedDate;
  // })
  //   : notes;

  // const filteredQueryNotes = query
  //   ? notes.filter(note =>
  //     note.title.toLowerCase().includes(query.toLowerCase()) ||
  //     note.content.toLowerCase().includes(query.toLowerCase())
  //   )
  //   : notes;
  const finalNotes = notes
    .filter(note => {
      if (!selectedDate) return true;
      const noteDate = new Date(note.createdAt).toISOString().split("T")[0];
      return noteDate === selectedDate;
    })
    .filter(note => {
      if (!query) return true;
      return (
        (note.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (note.content || "").toLowerCase().includes(query.toLowerCase())
      );
    });

  return (
    <div className="h-screen w-screen bg-gray-100">

      {/* Navbar */}
      <Navbar selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} query={query} setQuery={setQuery} />

      {/* Main */}
      <div className="p-4 flex justify-around items-start gap-6 w-full h-[90%]">

        {/* Form */}
        <div className="p-4 rounded-xl w-[20vw] h-[80vh] flex justify-start items-center flex-col">
          <h2 className="text-xl font-semibold mb-3">✎ Add New Note</h2>
          <NoteForm refreshNotes={fetchoNotes} />
        </div>

        {/* Notes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200 w-[80%] p-4">

          {notes.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No notes yet 📭
            </p>
          )}

          {finalNotes.map((note, index) => (
            <div
              key={note._id}
              className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300`}
            >
              <h3 className="font-bold text-lg text-gray-800">
                {note.title}
              </h3>

              <p className="text-gray-700 text-sm mt-2">
                {note.content}
              </p>

              {/* Date Time */}
              {note.createdAt && (
                <p className="text-sm text-gray-600 mt-2">
                  {new Date(note.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              )}

              <div className="flex justify-between mt-4">

                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-400"
                >
                  ✘
                </button>

                <button
                  onClick={() => handleEdit(note)}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  ✎
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
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setEditNote(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
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