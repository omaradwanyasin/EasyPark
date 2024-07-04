import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching user info from token
      const user = { name: "User" }; // Replace with actual user info decoded from token or fetched from an API
      setAuthenticatedUser(user);
    }
  }, []);

  async function signIn(credentials) {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setAuthenticatedUser(data.user);
      } else {
        console.error('Sign in failed:', response.statusText);
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
  }

  return (
    <AuthContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
