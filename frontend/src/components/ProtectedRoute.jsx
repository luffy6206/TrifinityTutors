import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const student = localStorage.getItem("student");
  const tutorStr = localStorage.getItem("tutor");

  // If nothing indicates an authenticated user, send to home
  if (!token && !student && !tutorStr) {
    return <Navigate to="/" />;
  }

  // If tutor exists but profile is not complete, redirect to registration
  if (tutorStr) {
    try {
      const tutor = JSON.parse(tutorStr);
      const isComplete = tutor.isProfileComplete ?? tutor.profileComplete ?? Boolean(tutor.status);
      if (!isComplete) {
        return <Navigate to="/register-tutor" replace />;
      }
    } catch (e) {
      // ignore parse errors and allow access if token exists
    }
  }

  return children;
}

export default ProtectedRoute;