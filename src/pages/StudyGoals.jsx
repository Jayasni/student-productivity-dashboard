
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function StudyGoals() {
  const { goals, addGoal, incrementGoal } = useApp();

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("2");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || Number(target) < 1) return;

    addGoal(title.trim(), Number(target));
    setTitle("");
    setTarget("2");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-bold">Create a study goal</h2>
        <p className="mb-5 mt-1 text-sm text-gray-500">
          Set a target for your daily learning sessions.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-[1fr_180px_auto]"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Practice React"
            required
            className="min-w-0 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            type="number"
            min="1"
            max="100"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            aria-label="Target number of study sessions"
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          >
            + Add Goal
          </button>
        </form>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Your study goals</h2>
          <p className="mt-1 text-sm text-gray-500">
            One session at a time. Keep going!
          </p>
        </div>

        {goals.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
            No goals yet. Create your first study goal above.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {goals.map((goal) => {
              const percentage = Math.min(
                100,
                Math.round((goal.completed / goal.target) * 100)
              );

              const finished = goal.completed >= goal.target;

              return (
                <article
                  key={goal.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-700">
                        ◎
                      </div>
                      <h3 className="text-lg font-bold">{goal.title}</h3>
                    </div>

                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                      {finished ? "Achieved" : "In progress"}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Study sessions</span>
                    <span className="font-semibold">
                      {goal.completed}/{goal.target}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      style={{ width: `${percentage}%` }}
                      className={`h-full rounded-full transition-all ${
                        finished ? "bg-green-500" : "bg-purple-600"
                      }`}
                    />
                  </div>

                  <p className="mt-2 text-right text-sm text-gray-500">
                    {percentage}% complete
                  </p>

                  <button
                    disabled={finished}
                    onClick={() => incrementGoal(goal.id)}
                    className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700 disabled:bg-green-100 disabled:text-green-700"
                  >
                    {finished ? "Goal completed ✓" : "Mark session complete +1"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
