import { useParams, useNavigate } from "react-router";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "Manraj", department: "IT", age: 22 },
    { id: 2, name: "Harman", department: "HR", age: 24 },
    { id: 3, name: "Praveen", department: "Finance", age: 26 },
  ];

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold text-red-500">User not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-200  to-teal-200 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center transition hover:scale-105 duration-300">
       
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>

      
        <div className="space-y-2 mt-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">User ID:</span>{" "}
            {user.id}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Department:</span>{" "}
            {user.department}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Age:</span> {user.age}
          </p>
        </div>

      
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
