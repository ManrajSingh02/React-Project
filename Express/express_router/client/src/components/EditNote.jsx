import { useState } from "react";

export default function EditNote({ note, onSuccess }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const API_URL = import.meta.env.VITE_API_URL;

  const updateNote = async () => {
    try {
      const res = await fetch(`${API_URL}/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        alert("Update failed ");
        return;
      }

      alert("Note updated ");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Something went wrong ");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">


      <h2 className="text-2xl font-semibold text-gray-800">
        Edit Note
      </h2>

 
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

    
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        />
      </div>

  
      <div className="flex justify-end gap-3">

        <button
          onClick={onSuccess}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={updateNote}
          className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
        >
          Update
        </button>

      </div>
    </div>
  );
}
