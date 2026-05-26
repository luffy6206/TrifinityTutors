import { useState } from "react";

function getStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && typeof user === "object") return user;

    const tutor = JSON.parse(localStorage.getItem("tutor"));
    if (tutor && typeof tutor === "object") return { ...tutor, role: tutor.role || "tutor" };

    const student = JSON.parse(localStorage.getItem("student"));
    if (student && typeof student === "object") return { ...student, role: student.role || "student" };
  } catch {
    return null;
  }

  return null;
}

export function dashboardPathFor(role) {
  switch (role) {
    case "tutor":
      return "/tutor-dashboard";
    case "student":
      return "/dashboard/student";
    case "admin":
      return "/admin";
    default:
      return "/";
  }
}

export function useAuth() {
  const [user, setUser] = useState(getStoredUser);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tutor");
    localStorage.removeItem("student");
    setUser(null);
  }

  return { user, logout };
}
