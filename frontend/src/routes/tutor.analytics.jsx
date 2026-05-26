import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/analytics")({
  component: () => <div className="p-6">Analytics - Coming Soon</div>,
});
