import React, { createContext, useState, useContext, useEffect } from 'react';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const authToken = localStorage.getItem("authToken");
    const isLogged = localStorage.getItem("IsLogged");
    const userRole = localStorage.getItem("userRole");

    if (isLogged) {
      setUser({
        userName,
        email,
        userId,
        authToken,
        userRole
      });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("userEmail", data.userEmail);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("email", data.email);
    localStorage.setItem("authToken", data.authToken);
    localStorage.setItem("IsLogged", data.IsLogged);
    localStorage.setItem("userRole", data.userRole);
    setUser({
      userName: data.userName,
      email: data.email,
      userId: data.userId,
      authToken: data.authToken,
      userRole: data.userRole,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <authContext.Provider value={{
      user,
      login,
      logout,
      isLoggedin: Boolean(user),
    }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
