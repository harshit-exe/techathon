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
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
          console.log(data.user);
        }
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409)
        return { success: response.success, message: response.message };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user); // Set user info
        document.cookie = `token=${data.token}; path=/;`;
      }

      return data;
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await fetch(`${apiURL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user); // ✅ User info store karo
        document.cookie = `token=${data.token}; path=/;`; // ✅ Normal login jaisa token set karo
      }

      return data;
    } catch (error) {
      return { success: false, message: "Google login failed" };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${apiURL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(false);
        setUser(null);
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      return data;
    } catch (error) {
      return { success: false, message: "Logout failed" };
    }
  };

  return {
    signup,
    login,
    logout,
    isAuthenticated,
    user,
    loading,
    googleLogin,
  };
};
