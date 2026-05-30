import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TutorLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login", { replace: true, state: { role: "tutor" } });
  }, [navigate]);

  return null;
}

export default TutorLogin;

