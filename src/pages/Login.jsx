
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { user, login } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    login(name.trim(), email.trim());
    navigate("/", { replace: true });
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

          <h1 className="text-3xl font-extrabold">Welcome back!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Let's make today productive.
          </p>
        </div>

        <label className="mb-2 block text-sm font-semibold">
          Your name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          minLength={2}
          className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        <label className="mb-2 block text-sm font-semibold">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
          required
          className="mb-6 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
        >
          Enter My Dashboard →
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          Demo login · No password required
        </p>
      </form>
    </div>
  );
}
