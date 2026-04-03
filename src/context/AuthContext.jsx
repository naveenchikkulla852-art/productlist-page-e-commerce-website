import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("plp_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  const signUp = async ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("plp_users") || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      avatar: name[0].toUpperCase(),
    };
    users.push({ ...newUser, password });
    localStorage.setItem("plp_users", JSON.stringify(users));
    localStorage.setItem("plp_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signIn = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("plp_users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) throw new Error("Invalid email or password.");
    const { password: _, ...userData } = found;
    localStorage.setItem("plp_user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signOut = () => {
    localStorage.removeItem("plp_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
