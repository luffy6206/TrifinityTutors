import { createFileRoute } from "@tanstack/react-router";
import TutorDashboard from "@/pages/TutorDashboard";

export const Route = createFileRoute("/tutor/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Trifinity" }] }),
  component: TutorDashboard,
});
