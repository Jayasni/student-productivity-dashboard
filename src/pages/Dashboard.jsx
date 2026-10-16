
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { user, assignments, goals } = useApp();

  const completedTasks = assignments.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = assignments.length - completedTasks;

  const completedGoals = goals.filter(
    (goal) => goal.completed >= goal.target
  ).length;

  const stats = [
    {
      label: "Total assignments",
      value: assignments.length,
      icon: "▤",
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "✓",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Pending tasks",
      value: pendingTasks,
      icon: "◷",
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Goals achieved",
      value: `${completedGoals}/${goals.length}`,
      icon: "◎",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  const upcoming = assignments
    .filter((item) => !item.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-600 p-7 text-white shadow-lg sm:p-9">
        <p className="mb-2 text-sm text-purple-100">
          YOUR PERSONAL LEARNING SPACE
        </p>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Hello, {user?.name}! 👋
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-purple-100 sm:text-base">
          Every small step brings you closer to your goals.
          Let's make progress today.
        </p>

        <Link
          to="/assignments"
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-50"
        >
          View my assignments →
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-3xl font-extrabold">{stat.value}</p>
            <p className="mt-2 text-xs text-gray-400">
              Based on your current progress
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <article className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-3">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">Upcoming assignments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Keep track of what's next
              </p>
            </div>
            <Link to="/assignments" className="text-sm font-semibold text-purple-700">
              View all →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              You're all caught up! 🎉
            </p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.course} · Due {item.dueDate}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                  }`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-2">
          <h3 className="text-lg font-bold">Study goals</h3>
          <p className="mb-6 mt-1 text-sm text-gray-500">
            Your daily learning targets
          </p>

          <div className="space-y-6">
            {goals.slice(0, 4).map((goal) => {
              const percentage = goal.target
                ? Math.round((goal.completed / goal.target) * 100)
                : 0;

              return (
                <div key={goal.id}>
                  <div className="mb-2 flex justify-between gap-3 text-sm">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-gray-500">
                      {goal.completed}/{goal.target}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full rounded-full bg-purple-600 transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/goals"
            className="mt-6 inline-block text-sm font-semibold text-purple-700"
          >
            Manage study goals →
          </Link>
        </article>
      </section>
    </div>
  );
}
