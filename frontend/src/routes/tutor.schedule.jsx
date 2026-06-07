import { createFileRoute, Link } from "@tanstack/react-router";
import { DashLayout } from "@/components/dash/DashLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Home, Calendar, MessageSquare, Bell, Video, MapPin, Star } from "lucide-react";
import { useAuth, dashboardPathFor } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/tutor/schedule")({
  head: () => ({ meta: [{ title: "My Sessions — Trifinity" }] }),
  component: Sessions,
});

function Sessions() {
  const { user } = useAuth();
  const [tab, setTab] = useState("Upcoming");
  const [list, setList] = useState([
    { id: "s1", tutor: "Ananya Sharma", subject: "Physics", when: "Today · 6:00 PM", mode: "online", status: "Upcoming" },
    { id: "s2", tutor: "Rohan Verma", subject: "Mathematics", when: "Tomorrow · 5:30 PM", mode: "home", status: "Upcoming" },
    { id: "s3", tutor: "Sneha Iyer", subject: "English", when: "Last Fri · 4:00 PM", mode: "online", status: "Completed" },
    { id: "s4", tutor: "Arjun Patel", subject: "Chemistry", when: "Last Wed · 3:30 PM", mode: "home", status: "Completed" },
  ]);

  const items = [
    { to: dashboardPathFor(user?.role ?? "tutor"), label: "Overview", icon: Home },
    { to: "/tutor/schedule", label: "My Sessions", icon: Calendar },
    { to: "/tutor/messages", label: "Messages", icon: MessageSquare },
    { to: "/tutor/notifications", label: "Notifications", icon: Bell },
  ];

  function cancel(id) {
    setList((current) => current.map((s) => (s.id === id ? { ...s, status: "Cancelled" } : s)));
    toast.success("Session cancelled — refund issued");
  }

  const filtered = list.filter((s) => s.status === tab);

  return (
    <DashLayout items={items} title="Sessions">
      <h1 className="text-3xl font-bold">My sessions</h1>
      <div className="mt-4 inline-flex p-1 rounded-2xl bg-accent/40">
        {["Upcoming", "Completed", "Cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              tab === t ? "bg-background shadow-soft" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <Card className="rounded-3xl p-12 text-center border-dashed">
            <div className="font-semibold">No {tab.toLowerCase()} sessions</div>
            <p className="text-sm text-muted-foreground mt-1">When you have {tab.toLowerCase()} sessions they'll appear here.</p>
            <Button asChild className="mt-4 rounded-full gradient-primary text-primary-foreground border-0">
              <Link to="/tutors">Find a tutor</Link>
            </Button>
          </Card>
        ) : (
          filtered.map((s) => (
            <Card key={s.id} className="rounded-2xl p-5 border-border/60 shadow-card flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground font-bold">
                {s.tutor[0]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{s.tutor} · {s.subject}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                  <span>{s.when}</span>
                  <span className="inline-flex items-center gap-1">
                    {s.mode === "online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />} {s.mode}
                  </span>
                </div>
              </div>
              <Badge className={`rounded-full border-0 ${s.status === "Upcoming" ? "bg-primary/15 text-primary" : s.status === "Completed" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {s.status}
              </Badge>
              <div className="flex gap-2">
                {s.status === "Upcoming" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => cancel(s.id)} className="rounded-full">Cancel</Button>
                    <Button size="sm" className="rounded-full gradient-primary text-primary-foreground border-0">
                      {s.mode === "online" ? "Join" : "Directions"}
                    </Button>
                  </>
                )}
                {s.status === "Completed" && (
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success("Review submitted")}> 
                    <Star className="h-3.5 w-3.5 mr-1" />Review
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </DashLayout>
  );
}
