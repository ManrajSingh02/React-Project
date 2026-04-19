import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/notes`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(" Cannot connect to server");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${BASE_URL}/notes/${editingId}`
        : `${BASE_URL}/notes`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError(" Operation failed");
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    } catch {
      setError(" Delete failed");
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Notes App</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <input
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded-lg p-2 mb-3"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className={`w-full py-2 rounded-lg text-white 
              ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-400"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow rounded-xl p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editNote(note)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
