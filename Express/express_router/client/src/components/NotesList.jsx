export default function NotesList({ notes, onSelect, selectedId }) {
  if (!Array.isArray(notes))
    return <p className="text-gray-500 text-center">Loading...</p>;

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={`p-3 rounded-lg cursor-pointer transition 
            ${
              selectedId === note.id
                ? "bg-slate-700 text-white"
                : "bg-slate-600 text-gray-200 hover:bg-slate-500"
            }`}
        >
          <p className="font-medium">{note.title}</p>
        </div>
      ))}
    </div>
  );
}