import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function readUser() {
  try {
    return localStorage.getItem("cinesearch-user");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  function login(username) {
    localStorage.setItem("cinesearch-user", username);
    setUser(username);
  }

  function logout() {
    localStorage.removeItem("cinesearch-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
