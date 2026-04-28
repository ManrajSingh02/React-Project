export default function NotesList({ notes, onSelect, selectedId }) {
  if (!Array.isArray(notes)) return <p>Loading...</p>;

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelect(note.id)}
          style={{
            padding: "8px",
            background: selectedId === note.id ? "#334155" : "#475569",
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          {note.title}
        </div>
      ))}
    </div>
  );
}