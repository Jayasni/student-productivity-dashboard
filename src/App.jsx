import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminStudents from "./pages/AdminStudents";
import ProtectedRoute from "./components/ProtectedRoute";

// Replace this import with your actual dashboard page.
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminStudents />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}