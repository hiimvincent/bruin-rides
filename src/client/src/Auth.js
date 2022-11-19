import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser, userID, setUserID }}>
        {children}
      </AuthContext.Provider>
    );
  };


export const RequireAuth = () => {
const { user } = useAuth();
const location = useLocation();

if (!user) {
    return (
    <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace
    />
    );
}

return <Outlet />;
};