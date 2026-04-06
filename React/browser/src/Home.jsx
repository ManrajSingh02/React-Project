import { NavLink } from "react-router";

function Home() {
  const users = [
    { id: 1, name: "Manraj" },
    { id: 2, name: "Harman" },
    { id: 3, name: "Praveen" },
  ];

  const baseStyle =
    "bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";
  const activeStyle =
    "bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";
  const inactiveStyle =
    "bg-blue-400 p-4 flex justify-center gap-6 shadow-md rounded-2xl";

  return (
    <div className="min-h-[70vh] bg-gradient-to-r from-blue-200 to-teal-300 flex items-center justify-center rounded-2xl">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Home
        </h2>

        <div className="flex items-center justify-center">
          <p className="text-lg">Select a user:</p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {users.map((user) => (
            <NavLink
              key={user.id}
              to={`/user/${user.id}`}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              {user.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
