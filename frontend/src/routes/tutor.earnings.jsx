import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/earnings")({
  component: () => <div className="p-6">Earnings - Coming Soon</div>,
});
