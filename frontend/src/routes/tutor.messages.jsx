import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutor/messages")({
  component: () => <div className="p-6">Messages - Coming Soon</div>,
});
