export default function NoteDetail({ note }) {
  if (!note) {
    return (
      <div className="text-gray-500 text-center py-10">
        Select a note to view
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="mt-2 text-gray-600">{note.content}</p>
    </div>
  );
}