export default function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
                 text-white px-4 py-2 rounded-lg shadow-sm 
                 transition-all duration-200 active:scale-95"
    >
      ✏️ Edit
    </button>
  );
}