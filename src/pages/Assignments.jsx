
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Assignments() {
  const {
    assignments,
    addAssignment,
    toggleAssignment,
    deleteAssignment,
  } = useApp();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !course.trim() || !dueDate) return;

    addAssignment({
      title: title.trim(),
      course: course.trim(),
      dueDate,
      priority,
    });

    setTitle("");
    setCourse("");
    setDueDate("");
    setPriority("Medium");
  }

  const filteredAssignments = assignments.filter((item) => {
    const matchesSearch =
      `${item.title} ${item.course}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !item.completed) ||
      (filter === "Completed" && item.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-bold">Add a new assignment</h2>
        <p className="mb-5 mt-1 text-sm text-gray-500">
          Keep all your academic deadlines in one place.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment title"
            required
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course name"
            required
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toLocaleDateString("en-CA")}
            required
            className="min-w-0 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
          >
            + Add Assignment
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Your assignments</h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 sm:w-64"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {["All", "Pending", "Completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                filter === item
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-purple-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredAssignments.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No assignments found.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredAssignments.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 p-4"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleAssignment(item.id)}
                    aria-label={`Mark ${item.title} as complete`}
                    className="mt-1 h-5 w-5 accent-purple-600"
                  />

                  <div className="min-w-0">
                    <p className={`break-words font-semibold ${item.completed ? "text-gray-400 line-through" : ""}`}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.course} · Due {item.dueDate}
                    </p>
                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : item.priority === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                    }`}>
                      {item.priority} priority
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteAssignment(item.id)}
                  className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
