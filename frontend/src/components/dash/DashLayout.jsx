import { NavLink, Link, useLocation } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";

export function DashLayout({ items, title, children }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-accent/30">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-2 px-2 py-3 mb-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-bold tracking-tight">Trifinity</span>
        </Link>
        <div className="text-xs uppercase tracking-wider text-sidebar-foreground/60 px-3 mb-2">{title}</div>
        <nav className="space-y-1 flex-1">
          {items.map((i) => {
            return (
              <NavLink
                key={`${i.to}-${i.label}`}
                to={i.to}
                className={({ isActive }) => {
                  const active = isActive || (i.activeWhen && path === i.activeWhen);
                  return `block w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active ? "bg-blue-600 text-white shadow-glow" : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`;
                }}
              >
                <i.icon className="h-4 w-4" />
                <span className="truncate">{i.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <Link to="/auth/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </aside>
      <main className="flex-1 min-w-0 p-5 md:p-8">{children}</main>
    </div>
  );
}
