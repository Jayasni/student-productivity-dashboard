
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function AdminStudents() {
  const {
    user,
    logout,
    students,
    addStudent,
    addGoal,
  } = useApp();

  const navigate = useNavigate();

  // Create student form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialGoal, setInitialGoal] = useState("");
  const [initialTarget, setInitialTarget] = useState("2");

  // Assign goal form state
  const [selectedStudent, setSelectedStudent] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("2");

  // Notification state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only admins can access this page
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin logout
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  // Create a student account
  function handleCreateStudent(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const student = addStudent({
        name,
        email,
        password,
      });

      // Assign an optional initial goal
      if (initialGoal.trim()) {
        addGoal(initialGoal, initialTarget, student.id);
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setInitialGoal("");
      setInitialTarget("2");

      setMessage(
        `Account created successfully for ${student.name}. Their goal starts at 0%.`
      );
    } catch (err) {
      setError(err.message || "Unable to create student account.");
    }
  }

  // Assign a goal to a particular student
  function handleAssignGoal(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      if (!selectedStudent) {
        throw new Error("Please select a student.");
      }

      if (!goalTitle.trim()) {
        throw new Error("Please enter a goal title.");
      }

      addGoal(goalTitle, goalTarget, selectedStudent);

      setGoalTitle("");
      setGoalTarget("2");

      setMessage(
        "Goal assigned successfully. Progress starts at 0%."
      );
    } catch (err) {
      setError(err.message || "Unable to assign goal.");
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Admin Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-purple-600">
            Student Productivity Dashboard
          </p>

          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Manage Students
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome, {user.name}! Create student accounts and assign learning goals.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          <span aria-hidden="true">↪</span>
          Logout
        </button>
      </header>

      {/* Success Message */}
      {message && (
        <p
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
        >
          {message}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}

      {/* Create Student Account */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Create Student Account
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create login credentials for a new student.
          </p>
        </div>

        <form
          onSubmit={handleCreateStudent}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="studentName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Student Name
            </label>

            <input
              id="studentName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="studentEmail"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Student Email
            </label>

            <input
              id="studentEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              autoComplete="off"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="studentPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Temporary Password
            </label>

            <input
              id="studentPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="rounded-xl bg-purple-50 p-4">
              <h3 className="font-semibold text-purple-900">
                Initial Study Goal (Optional)
              </h3>

              <p className="mt-1 text-sm text-purple-700">
                You can assign a goal while creating the account. Every new
                goal starts at 0% progress.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="initialGoal"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Goal Title
            </label>

            <input
              id="initialGoal"
              type="text"
              value={initialGoal}
              onChange={(e) => setInitialGoal(e.target.value)}
              placeholder="Example: Practice React"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="initialTarget"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Target Sessions
            </label>

            <input
              id="initialTarget"
              type="number"
              min="1"
              max="100"
              value={initialTarget}
              onChange={(e) => setInitialTarget(e.target.value)}
              disabled={!initialGoal.trim()}
              required={Boolean(initialGoal.trim())}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 sm:col-span-2"
          >
            + Create Student Account
          </button>
        </form>
      </section>

      {/* Assign Goal */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Assign a Study Goal
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose a student to assign a personal learning goal.
          </p>
        </div>

        <form
          onSubmit={handleAssignGoal}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div>
            <label
              htmlFor="selectedStudent"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Select Student
            </label>

            <select
              id="selectedStudent"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            >
              <option value="">Choose a student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="goalTitle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Goal Title
            </label>

            <input
              id="goalTitle"
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="Example: Complete React course"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="goalTarget"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Target Sessions
            </label>

            <input
              id="goalTarget"
              type="number"
              min="1"
              max="100"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <button
            type="submit"
            disabled={students.length === 0}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 lg:col-span-3"
          >
            + Assign Goal (Starts at 0%)
          </button>
        </form>

        {students.length === 0 && (
          <p className="mt-3 text-sm text-amber-700">
            Create a student account before assigning a goal.
          </p>
        )}
      </section>

      {/* Student Accounts */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Student Accounts
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Students who can sign in to the dashboard.
            </p>
          </div>

          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
            {students.length} Students
          </span>
        </div>

        {students.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-700">
              No students created yet.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Use the form above to create the first student account.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {student.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {student.email}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  Student Account
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Logout Footer */}
      <footer className="pb-4 text-center text-xs text-gray-400">
        Student Productivity Dashboard · Admin Panel
      </footer>
    </div>
  );
}
