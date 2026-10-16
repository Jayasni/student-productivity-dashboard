
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";


const navItems = [
  { to: "/", label: "Overview", icon: "▦", end: true },
  { to: "/courses", label: "My Courses", icon: "▤" },
  { to: "/assignments", label: "Assignments", icon: "✓" },
  { to: "/goals", label: "Study Goals", icon: "◎" },
];

export default function Sidebar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex min-h-screen w-full shrink-0 flex-col bg-[#211b35] p-5 text-white md:sticky md:top-0 md:h-screen md:w-64">
      <h1 className="mb-2 text-2xl font-extrabold">
        Study<span className="text-purple-400">Space</span>
      </h1>

      <p className="mb-10 text-xs text-gray-400">
        YOUR LEARNING COMPANION
      </p>

      <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">
        Workspace
      </p>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/30"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            <span className="w-5 text-center text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-gray-400">Student</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10"
        >
          ↪ Sign out
        </button>
      </div>
    </aside>
  );
}
