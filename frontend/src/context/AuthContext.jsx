import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('omtex_token'));
  const [username, setUsername] = useState(localStorage.getItem('omtex_username'));
  const [role, setRole] = useState(localStorage.getItem('omtex_role'));
  const [fullName, setFullName] = useState(localStorage.getItem('omtex_full_name'));

  const isAdmin = role === 'admin' || role === 'super_admin';
  const isSuperAdmin = role === 'super_admin';

  const login = (newToken) => {
    localStorage.setItem('omtex_token', newToken);
    
    // Decode JWT (base64)
    try {
      const base64Url = newToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      localStorage.setItem('omtex_username', payload.sub);
      localStorage.setItem('omtex_role', payload.role);
      localStorage.setItem('omtex_full_name', payload.full_name);
      
      setToken(newToken);
      setUsername(payload.sub);
      setRole(payload.role);
      setFullName(payload.full_name);
    } catch (e) {
      console.error("Token decoding failed", e);
    }
  };

  const logout = () => {
    localStorage.removeItem('omtex_token');
    localStorage.removeItem('omtex_username');
    localStorage.removeItem('omtex_role');
    localStorage.removeItem('omtex_full_name');
    setToken(null);
    setUsername(null);
    setRole(null);
    setFullName(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, role, fullName, isAdmin, isSuperAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
