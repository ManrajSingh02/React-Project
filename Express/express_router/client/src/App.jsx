import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import NotesList from "./components/NotesList";
import NoteDetail from "./components/NoteDetail";
import EditNote from "./components/EditNote";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  const fetchNote = async (id) => {
    const res = await fetch(`${API_URL}/notes/${id}`);
    const data = await res.json();
    setNote(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetchNote(selectedId);
      setEditing(false);
      setAdding(false);
    }
  }, [selectedId]);

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        return;
      }

      await res.json();

      setNewNote({ title: "", content: "" });
      setAdding(false);
      fetchNotes();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleUpdateSuccess = () => {
    setEditing(false);
    fetchNotes();
    fetchNote(selectedId);
  };

  const handleDelete = async () => {
    await fetch(`${API_URL}/notes/${selectedId}`, {
      method: "DELETE",
    });

    setSelectedId(null);
    setNote(null);
    fetchNotes();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-70 bg-slate-900 text-white flex flex-col p-5 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">📝 Notes</h2>
          <p className="text-sm text-gray-400">Manage your notes</p>
        </div>

        <button
          onClick={() => {
            setAdding(true);
            setEditing(false);
            setSelectedId(null);
          }}
          className="bg-green-500 hover:bg-green-600 py-2 rounded-lg mb-4"
        >
          Add Note
        </button>

        <div className="flex-1 overflow-y-auto">
          <NotesList
            notes={notes}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          {adding && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Create Note</h2>

              <input
                placeholder="Title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          )}

          {!adding && note && !editing && (
            <div className="space-y-6">
              <NoteDetail note={note} />

              <div className="flex gap-3">
                <EditButton onClick={() => setEditing(true)} />
                <DeleteButton onClick={() => setIsOpen(true)} />
              </div>
            </div>
          )}

          {!adding && note && editing && (
            <EditNote note={note} onSuccess={handleUpdateSuccess} />
          )}

          {!adding && !note && (
            <div className="text-center text-gray-500 py-20">
              <h2 className="text-xl">Select or create a note</h2>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold">
              Delete Note
            </Dialog.Title>

            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this note?
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <DeleteButton
                onClick={async () => {
                  await handleDelete();
                  setIsOpen(false);
                }}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
