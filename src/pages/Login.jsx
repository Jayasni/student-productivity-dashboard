
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { user, login } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/"}
        replace
      />
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = login(email, password,role);

      // Verify that the account matches the selected login type.
      if (loggedInUser.role !== role) {
        // Clear the session if the wrong login type was selected.
        // This prevents continuing with the wrong dashboard.
        throw new Error(
          `This account is not registered as ${role}. Please select the correct login type.`
        );
      }

      navigate(
        loggedInUser.role === "admin" ? "/admin" : "/",
        { replace: true }
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-xl sm:p-10"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-2xl font-bold text-white">
            S
          </div>

          <h1 className="text-3xl font-extrabold">
            Welcome back!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your productivity dashboard.
          </p>
        </div>

        {/* Select login type */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setRole("student");
              setError("");
            }}
            className={`rounded-xl border-2 p-4 text-left transition ${
              role === "student"
                ? "border-purple-600 bg-purple-50 text-purple-700"
                : "border-gray-200 text-gray-600 hover:border-purple-300"
            }`}
          >
            <span className="mb-2 block text-2xl">🎓</span>
            <span className="block font-bold">Student Login</span>
            <span className="mt-1 block text-xs">
              View your progress
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            className={`rounded-xl border-2 p-4 text-left transition ${
              role === "admin"
                ? "border-purple-600 bg-purple-50 text-purple-700"
                : "border-gray-200 text-gray-600 hover:border-purple-300"
            }`}
          >
            <span className="mb-2 block text-2xl">🛡️</span>
            <span className="block font-bold">Admin Login</span>
            <span className="mt-1 block text-xs">
              Manage students
            </span>
          </button>
        </div>

        <div className="mb-5 rounded-xl bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-800">
            {role === "admin" ? "Administrator access" : "Student access"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {role === "admin"
              ? "Create student accounts and assign study goals."
              : "Sign in with the credentials provided by your administrator."}
          </p>
        </div>

        <label className="mb-2 block text-sm font-semibold">
          Email address
        </label>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            role === "admin"
              ? "admin@dashboard.com"
              : "student@example.com"
          }
          required
          className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        <label className="mb-2 block text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
        >
          {role === "admin"
            ? "Sign In as Admin →"
            : "Sign In as Student →"}
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          Student accounts are created by the administrator.
        </p>
      </form>
    </div>
  );
}
