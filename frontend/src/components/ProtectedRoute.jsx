import { Navigate, useLocation } from "react-router-dom";
import { getStoredAuth, useAuth, dashboardPathFor } from "@/lib/auth";

function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const stored = getStoredAuth();
  const token = auth?.token || stored.token;
  const user = auth?.user || stored.user;
  const loading = auth?.loading || false;

  // Show loading spinner while auth is restoring
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  const tutorOnlyPaths = ["/tutor-dashboard", "/dashboard/tutor", "/tutor/schedule"];
  const studentOnlyPaths = ["/student-dashboard", "/dashboard/student"];

  if (user.role === "tutor" && studentOnlyPaths.includes(location.pathname)) {
    return <Navigate to={dashboardPathFor("tutor")} replace />;
  }

  if (user.role === "student" && tutorOnlyPaths.includes(location.pathname)) {
    return <Navigate to={dashboardPathFor("student")} replace />;
  }

  if (user.role === "tutor") {
    const isComplete = user.profileComplete ?? user.isProfileComplete ?? Boolean(user.status);
    if (!isComplete) {
      return <Navigate to="/register-tutor" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;