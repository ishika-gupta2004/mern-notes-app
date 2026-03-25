import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ selectedDate, setSelectedDate, query, setQuery }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);
  }, []);

  return (
    <div className="w-full h-[10vh] bg-white  flex justify-between items-center lg:px-8 shadow-sm">

      {/* LEFT LOGO */}
      <h1 className="p-2 lg:text-2xl font-bold tracking-wide text-gray-800 flex items-center gap-2">
        <span className="w-19 📝 lg:w-29 mr-2">My Notes</span>
      </h1>

      {/* CENTER CONTROLS */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="🔍 Search notes..."
          className="rounded-full px-5 py-2 outline-none w-[250px] ring-2 ring-indigo-400 transition"
        />

        {/* Date */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="hidden lg:block rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* RIGHT USER SECTION */}
      <div className="flex items-center gap-4">


        <div className="hidden lg:flex w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white items-center justify-center font-bold shadow-md">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Name */}
        <div className="hidden lg:flex flex-col leading-tight">
          <span className="text-sm text-gray-500">Welcome</span>
          <span className="font-semibold text-gray-800">
            {name || "User"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="hidden lg:block px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* Mobile Red Dot */}
        <button
          onClick={logout}
          className="lg:hidden w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md"
        >
          ⏻
        </button>
      </div>
    </div>
  );
};