import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext(null);

const ADMIN_ACCOUNT = {
  id: "admin-1",
  name: "Admin",
  email: "admin@dashboard.com",
  password: "Admin@123",
  role: "admin",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readUsers() {
  const storedUsers = readStorage("dashboardUsers", null);

  if (Array.isArray(storedUsers)) {
    // Ensure the demo admin account remains available.
    const hasAdmin = storedUsers.some(
      (item) => item.email === ADMIN_ACCOUNT.email
    );

    return hasAdmin ? storedUsers : [...storedUsers, ADMIN_ACCOUNT];
  }

  return [ADMIN_ACCOUNT];
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(readUsers);

  const [user, setUser] = useState(() => {
    const savedUser = readStorage("studentUser", null);

    // Discard old sessions that don't contain a valid role.
    if (
      savedUser &&
      ["admin", "student"].includes(savedUser.role)
    ) {
      return savedUser;
    }

    return null;
  });

  // Keep existing data, but only show records belonging to each student.
  const [assignments, setAssignments] = useState(() =>
    readStorage("studentAssignments", [])
  );

  const [goals, setGoals] = useState(() =>
    readStorage("studentGoals", [])
  );

  useEffect(() => {
    localStorage.setItem("dashboardUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("studentAssignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("studentGoals", JSON.stringify(goals));
  }, [goals]);
function login(email, password, expectedRole) {
  const matchedUser = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  // Verify the selected login type BEFORE creating a session.
  if (matchedUser.role !== expectedRole) {
    throw new Error(
      `Please select ${
        matchedUser.role === "admin" ? "Admin Login" : "Student Login"
      }.`
    );
  }

  const loggedInUser = {
    id: matchedUser.id,
    name: matchedUser.name,
    email: matchedUser.email,
    role: matchedUser.role,
  };

  localStorage.setItem(
    "studentUser",
    JSON.stringify(loggedInUser)
  );

  setUser(loggedInUser);

  return loggedInUser;
}
  // function login(email, password) {
  //   const matchedUser = users.find(
  //     (item) =>
  //       item.email.toLowerCase() === email.trim().toLowerCase() &&
  //       item.password === password
  //   );

  //   if (!matchedUser) {
  //     throw new Error("Invalid email or password.");
  //   }

  //   const loggedInUser = {
  //     id: matchedUser.id,
  //     name: matchedUser.name,
  //     email: matchedUser.email,
  //     role: matchedUser.role,
  //   };

  //   localStorage.setItem(
  //     "studentUser",
  //     JSON.stringify(loggedInUser)
  //   );

  //   setUser(loggedInUser);
  //   return loggedInUser;
  // }

  function logout() {
    localStorage.removeItem("studentUser");
    setUser(null);
  }

  function addStudent({ name, email, password }) {
    if (user?.role !== "admin") {
      throw new Error("Only admins can create student accounts.");
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      throw new Error("Please fill in all student details.");
    }

    if (password.length < 8) {
      throw new Error("Student password must be at least 8 characters.");
    }

    if (users.some((item) => item.email.toLowerCase() === cleanEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const student = {
      id: `student-${crypto.randomUUID()}`,
      name: cleanName,
      email: cleanEmail,
      password,
      role: "student",
    };

    setUsers((previous) => [...previous, student]);

    // Return the new student so the admin can assign a goal.
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
    };
  }

  function addAssignment(assignment, studentId) {
    const assignedStudentId =
      user?.role === "admin" ? studentId : user?.id;

    if (!assignedStudentId) {
      throw new Error("Please select a student.");
    }

    setAssignments((previous) => [
      {
        ...assignment,
        id: crypto.randomUUID(),
        studentId: assignedStudentId,
        completed: false,
      },
      ...previous,
    ]);
  }

  function toggleAssignment(id) {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id &&
        (user?.role === "admin" || item.studentId === user?.id)
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteAssignment(id) {
    setAssignments((previous) =>
      previous.filter(
        (item) =>
          item.id !== id ||
          (user?.role !== "admin" && item.studentId !== user?.id)
      )
    );
  }

  function addGoal(title, target, studentId) {
    const assignedStudentId =
      user?.role === "admin" ? studentId : user?.id;

    if (!assignedStudentId) {
      throw new Error("Please select a student for this goal.");
    }

    const numericTarget = Number(target);

    if (!title.trim() || !Number.isInteger(numericTarget) ||
        numericTarget < 1 || numericTarget > 100) {
      throw new Error("Enter a valid goal and target (1–100).");
    }

    const newGoal = {
      id: crypto.randomUUID(),
      title: title.trim(),
      target: numericTarget,
      completed: 0,
      studentId: assignedStudentId,
      status: "Not Started",
    };

    setGoals((previous) => [...previous, newGoal]);
    return newGoal;
  }

  function incrementGoal(id) {
    setGoals((previous) =>
      previous.map((goal) => {
        if (
          goal.id !== id ||
          goal.studentId !== user?.id ||
          goal.completed >= goal.target
        ) {
          return goal;
        }

        const completed = goal.completed + 1;

        return {
          ...goal,
          completed,
          status:
            completed >= goal.target
              ? "Completed"
              : "In Progress",
        };
      })
    );
  }

  // Students receive only their own records. Admins can view all records.
  const visibleGoals =
    user?.role === "admin"
      ? goals
      : goals.filter((goal) => goal.studentId === user?.id);

  const visibleAssignments =
    user?.role === "admin"
      ? assignments
      : assignments.filter(
          (assignment) => assignment.studentId === user?.id
        );

  const students = users
    .filter((item) => item.role === "student")
    .map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        students,
        addStudent,
        assignments: visibleAssignments,
        addAssignment,
        toggleAssignment,
        deleteAssignment,
        goals: visibleGoals,
        addGoal,
        incrementGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}