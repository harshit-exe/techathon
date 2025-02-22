// useAuth hook

"use client";

import { useEffect, useState } from "react";
import { apiURL } from "../constants";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiURL}/api/auth/me`, {
          method: "GET", // ✅ GET request better hai, kyunki cookie automatic send hoti hai
          credentials: "include", // ✅ Cookie ko send karne ke liye
        });

        if (!response.ok) throw new Error("Not authenticated");

        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (formData) => {
    try {
      const response = await fetch(`${apiURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return { success: false, message: "Signup failed." };
    }
  };

  const login = async (formData) => {
    try {
      const response = await fetch(`${apiURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await fetch(`${apiURL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Google login failed");

      const data = await response.json();
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Google login failed",
      };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${apiURL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      setIsAuthenticated(false);
      setUser(null);
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      return { success: false, message: error.message || "Logout failed" };
    }
  };

  return { signup, login, logout, isAuthenticated, user, loading, googleLogin };
};
