
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Student workspace
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Learn. Practice. Grow.
            </h2>
          </div>

          <div className="rounded-full border border-purple-100 bg-white px-4 py-2 text-sm text-purple-700 shadow-sm">
            ✨ Keep learning every day
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
