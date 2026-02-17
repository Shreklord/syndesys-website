// src/components/RequireAdmin.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface RequireAdminProps {
  children: ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const location = useLocation();

  const isAuthed =
    typeof window !== "undefined" &&
    localStorage.getItem("admin_authed") === "true";

  if (!isAuthed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
