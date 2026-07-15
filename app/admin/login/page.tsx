"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Gem } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Background Pattern */}
      <div className="admin-login-bg" />

      {/* Floating Particles */}
      <div className="admin-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="admin-particle"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="admin-login-card">
        {/* Logo / Brand */}
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Gem className="w-8 h-8" />
          </div>
          <h1 className="admin-login-title">Eya Alankara</h1>
          <p className="admin-login-subtitle">Admin Portal</p>
        </div>

        {/* Divider */}
        <div className="admin-login-divider" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="admin-password" className="admin-input-label">
              <Lock className="w-3.5 h-3.5" />
              Password
            </label>
            <div className="admin-input-wrapper">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="admin-input"
                required
                autoFocus
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-input-toggle"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-error">
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !password}
            className="admin-login-btn"
          >
            {loading ? (
              <span className="admin-spinner" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="admin-login-footer">
          Protected area · Authorized personnel only
        </p>
      </div>
    </div>
  );
}
