import React, { createContext, useState, useContext } from 'react'

const authContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState();
    const login = (data) => {
        console.log("Test");
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
        })
    }

    const logout = () => {
        setUser();
        localStorage.clear();
    }

    return <authContext.Provider value={{
        user,
        login,
        logout,
        isLoggedin: Boolean(user),
    }}>
        {children}
    </authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}