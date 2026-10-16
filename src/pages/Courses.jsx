
import { useEffect, useState } from "react";

const courseStyles = [
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCourses() {
      try {
        setStatus("loading");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=8",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch learning resources");
        }

        const data = await response.json();
        setCourses(data);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      }
    }

    fetchCourses();

    return () => controller.abort();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Learning Resources</h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore learning content fetched from an API.
          </p>
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 sm:w-64"
        />
      </div>

      {status === "loading" && (
        <p className="py-12 text-center text-gray-500">
          Loading learning resources...
        </p>
      )}

      {status === "error" && (
        <div className="rounded-2xl bg-white p-8 text-center">
          <p className="text-red-600">
            Could not load resources. Check your internet connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-purple-600 px-5 py-2 text-white"
          >
            Try again
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCourses.map((course, index) => (
            <article
              key={course.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${courseStyles[index % courseStyles.length]} text-4xl text-white`}>
                {["📘", "💻", "🧠", "✍️"][index % 4]}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  Learning resource {course.id}
                </p>
                <h3 className="mt-2 line-clamp-2 min-h-12 font-bold capitalize">
                  {course.title}
                </h3>
                <p className="mt-3 text-sm text-gray-500">
                  {course.body.slice(0, 85)}...
                </p>
                <span className="mt-4 inline-block rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                  Resource
                </span>
              </div>
            </article>
          ))}

          {filteredCourses.length === 0 && (
            <p className="col-span-full py-10 text-center text-gray-500">
              No matching resources found.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
