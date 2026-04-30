export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
    >
      Delete
    </button>
  );
}
