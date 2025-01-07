import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);


  return (
    <AuthContext.Provider value={{ role ,setRole}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
