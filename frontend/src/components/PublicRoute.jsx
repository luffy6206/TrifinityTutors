function PublicRoute({ children }) {
  // Public routes like home should stay accessible even if a student or tutor is logged in.
  return children;
}

export default PublicRoute;
