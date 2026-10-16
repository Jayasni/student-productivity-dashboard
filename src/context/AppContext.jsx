
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() =>
    readStorage("studentUser", null)
  );

  const [assignments, setAssignments] = useState(() =>
    readStorage("studentAssignments", [
      {
        id: 1,
        title: "React Components Practice",
        course: "React.js",
        dueDate: "2026-10-20",
        priority: "High",
        completed: false,
      },
      {
        id: 2,
        title: "SQL Query Exercises",
        course: "Database",
        dueDate: "2026-10-22",
        priority: "Medium",
        completed: false,
      },
      {
        id: 3,
        title: "JavaScript Revision",
        course: "JavaScript",
        dueDate: "2026-10-18",
        priority: "High",
        completed: true,
      },
    ])
  );

  const [goals, setGoals] = useState(() =>
    readStorage("studentGoals", [
      {
        id: 1,
        title: "Study React",
        target: 2,
        completed: 1,
      },
      {
        id: 2,
        title: "Practice coding",
        target: 3,
        completed: 1,
      },
    ])
  );

  useEffect(() => {
    localStorage.setItem("studentAssignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("studentGoals", JSON.stringify(goals));
  }, [goals]);

  const login = (name, email) => {
    const loggedInUser = { name, email };
    localStorage.setItem("studentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("studentUser");
    setUser(null);
  };

  const addAssignment = (assignment) => {
    setAssignments((previous) => [
      { ...assignment, id: Date.now(), completed: false },
      ...previous,
    ]);
  };

  const toggleAssignment = (id) => {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const addGoal = (title, target) => {
    setGoals((previous) => [
      ...previous,
      {
        id: Date.now(),
        title,
        target: Number(target),
        completed: 0,
      },
    ]);
  };

  const incrementGoal = (id) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: Math.min(goal.completed + 1, goal.target),
            }
          : goal
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        assignments,
        addAssignment,
        toggleAssignment,
        deleteAssignment,
        goals,
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
