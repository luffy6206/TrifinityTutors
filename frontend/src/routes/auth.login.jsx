/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Users, Check } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, dashboardPathFor } from "@/lib/auth";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrors({});
    setLoading(true);

    try {
      if (!credentialResponse?.credential) {
        throw new Error("Google authentication failed.");
      }

      const endpoint = role === "tutor" ? "/api/tutors/google-login" : "/api/students/google-login";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Google login failed. Please try again.");
      }

      const authUser = {
        _id: data.user?._id || data.user?.id,
        id: data.user?.id || data.user?._id,
        name: data.user?.name || "",
        email: data.user?.email || "",
        role,
        googleId: data.user?.googleId || "",
        photo: data.user?.photo || data.user?.profilePhoto || "",
        profileComplete: data.isProfileComplete ?? data.user?.profileComplete,
        status: data.status || data.user?.status,
      };

      setSession(data.token, authUser);
      
      if (rememberMe) {
        localStorage.setItem("rememberEmail", data.user?.email);
      }
      
      toast.success("Login successful!");
      navigate(dashboardPathFor(role), { replace: true });
    } catch (error) {
      const message = error.message || "Google login failed. Please try again.";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (!form.email || !form.password) {
        throw new Error("Email and password are required.");
      }

      const endpoint = role === "tutor" ? "/api/tutors/email-login" : "/api/students/email-login";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      const authUser = {
        _id: data.user?._id || data.user?.id,
        id: data.user?.id || data.user?._id,
        name: data.user?.name || "",
        email: data.user?.email || "",
        role,
        photo: data.user?.photo || data.user?.profilePhoto || "",
        profileComplete: data.isProfileComplete ?? data.user?.profileComplete,
        status: data.status || data.user?.status,
      };

      setSession(data.token, authUser);
      
      if (rememberMe) {
        localStorage.setItem("rememberEmail", form.email);
      }
      
      toast.success("Login successful!");
      navigate(dashboardPathFor(role), { replace: true });
    } catch (error) {
      const message = error.message || "Login failed. Please try again.";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrors({});
    setForm({ email: "", password: "" });
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-muted-foreground">Sign in to continue your learning journey</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {([
          { id: "student", icon: GraduationCap, title: "I'm a Student", desc: "Find tutors" },
          { id: "tutor", icon: Users, title: "I'm a Tutor", desc: "Teach & earn" },
        ]).map(r => (
          <button
            key={r.id}
            onClick={() => handleRoleChange(r.id)}
            className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
              role === r.id ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/40"
            }`}
          >
            {role === r.id && (
              <div className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${
              role === r.id ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              <r.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-semibold">{r.title}</div>
            <div className="text-xs text-muted-foreground">{r.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            const message = "Google authentication failed. Please try again.";
            setErrors({ submit: message });
            toast.error(message);
          }}
          render={(renderProps) => (
            <button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled || loading}
              className="w-full h-11 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-slate-900 transition hover:border-slate-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.9a5.05 5.05 0 0 1-2.19 3.31v2.75h3.54c2.08-1.91 3.25-4.74 3.25-8.3z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.68l-3.54-2.75c-.98.66-2.24 1.05-3.74 1.05-2.87 0-5.3-1.94-6.17-4.55H2.18v2.84A11 11 0 0 0 12 23z"/>
                <path fill="#FBBC05" d="M5.83 14.07a6.6 6.6 0 0 1 0-4.14V7.09H2.18a11 11 0 0 0 0 9.82l3.65-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.16 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.09l3.65 2.84C6.7 7.32 9.13 5.38 12 5.38z"/>
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
          )}
        />
      </div>

      {errors.submit && <p className="mt-3 text-sm text-red-600 font-medium">{errors.submit}</p>}

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={handleEmailLogin}>
        <div>
          <Label>Email</Label>
          <Input 
            name="email" 
            autoComplete="email" 
            className="mt-2 h-11" 
            placeholder="you@email.com" 
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input 
            name="password" 
            autoComplete="current-password" 
            className="mt-2 h-11" 
            placeholder="••••••••" 
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-xs text-muted-foreground">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full h-11 bg-gradient-primary shadow-glow" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Don't have an account? <Link to="/auth/signup" className="font-semibold text-primary hover:underline">Create one</Link>
      </p>
      <Toaster position="top-right" />
    </div>
  );
}

export default LoginPage;