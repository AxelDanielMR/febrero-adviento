"use client";
import { useAuth } from "../../components/AuthProvider";
import Login from "../../components/Login";

export default function LoginPage() {
  const { user, setUser } = useAuth();
  if (user) return null;
  return <Login onLogin={setUser} />;
}
