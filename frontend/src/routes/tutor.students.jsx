import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/students")({
  component: () => <div className="p-6">Students - Coming Soon</div>,
});
