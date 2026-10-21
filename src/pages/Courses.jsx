
import { useEffect, useState } from "react";

const courseStyles = [
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
];

const courseIcons = [
  "☕",
  "🌐",
  "🐍",
  "⚡",
  "⚛️",
  "🎨",
  "🗄️",
  "🟢",
  "📘",
  "🎸",
  "🚀",
  "💻",
];

const initialCourses = [
  {
    id: 1,
    title: "Java",
    body: "Learn Java fundamentals, OOP concepts, classes, objects, inheritance, and exception handling.",
    category: "Programming",
    level: "Beginner",
  },
  {
    id: 2,
    title: "HTML",
    body: "Learn to structure web pages using HTML elements, forms, tables, semantic tags, and links.",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Python",
    body: "Learn Python syntax, variables, data types, loops, functions, collections, and OOP.",
    category: "Programming",
    level: "Beginner",
  },
  {
    id: 4,
    title: "JavaScript",
    body: "Master JavaScript variables, functions, arrays, objects, promises, async/await, and DOM manipulation.",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: 5,
    title: "React",
    body: "Build interactive user interfaces using components, props, state, hooks, and React Router.",
    category: "Frontend",
    level: "Intermediate",
  },
  {
    id: 6,
    title: "CSS",
    body: "Style websites using selectors, box model, Flexbox, Grid, responsive design, and animations.",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: 7,
    title: "SQL",
    body: "Learn databases, SELECT queries, filtering, joins, grouping, and CRUD operations.",
    category: "Database",
    level: "Beginner",
  },
  {
    id: 8,
    title: "Node.js",
    body: "Create server-side JavaScript applications and APIs using Node.js and Express.",
    category: "Backend",
    level: "Intermediate",
  },
  {
    id: 9,
    title: "TypeScript",
    body: "Learn types, interfaces, type aliases, generics, and TypeScript with React.",
    category: "Programming",
    level: "Intermediate",
  },
  {
    id: 10,
    title: "Django",
    body: "Build Python web applications using Django models, views, templates, and routing.",
    category: "Backend",
    level: "Intermediate",
  },
  {
    id: 11,
    title: "FastAPI",
    body: "Develop Python REST APIs with request validation, Pydantic models, and automatic documentation.",
    category: "Backend",
    level: "Intermediate",
  },
  {
    id: 12,
    title: "Full Stack Development",
    body: "Learn frontend, backend, databases, API integration, authentication, and complete web application development.",
    category: "Full Stack",
    level: "Beginner",
  },
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

        // Simulate loading course data.
        // Replace this with your real courses API when available.
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=1",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch learning resources");
        }

        await response.json();

        if (!controller.signal.aborted) {
          setCourses(initialCourses);
          setStatus("success");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          // Keep the local course catalog available if the demo API fails.
          setCourses(initialCourses);
          setStatus("success");
        }
      }
    }

    fetchCourses();

    return () => controller.abort();
  }, []);

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.body} ${course.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            My Learning Resources
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore programming, web development, and full-stack courses.
          </p>
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          aria-label="Search courses"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 sm:w-64"
        />
      </div>

      {status === "loading" && (
        <p className="py-12 text-center text-gray-500">
          Loading courses...
        </p>
      )}

      {status === "error" && (
        <p className="py-12 text-center text-red-600">
          Could not load courses. Please try again.
        </p>
      )}

      {status === "success" && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {filteredCourses.length} courses available
          </p>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`flex h-32 items-center justify-center bg-gradient-to-br ${
                    courseStyles[(course.id - 1) % courseStyles.length]
                  } text-4xl text-white`}
                >
                  {courseIcons[(course.id - 1) % courseIcons.length]}
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                    {course.category}
                  </p>

                  <h3 className="mt-2 min-h-12 font-bold capitalize">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {course.body}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                      {course.level}
                    </span>

                    <span className="text-xs text-gray-400">
                      Course {course.id}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {filteredCourses.length === 0 && (
              <p className="col-span-full py-10 text-center text-gray-500">
                No matching courses found.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
