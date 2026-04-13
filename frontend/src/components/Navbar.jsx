import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: "#0A1628", 
      padding: "0 2rem", 
      height: "64px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      position: "sticky", 
      top: 0, 
      zIndex: 1000,
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <a href="/" style={{color: "#fff", fontWeight: "800", fontSize: "1.3rem", textDecoration: "none", letterSpacing: "0.05em"}}>
        OM TEX SPARES
      </a>
      
      <div style={{display: "flex", gap: "2rem", listStyle: "none", alignItems: "center"}}>
        <Link to="/products" style={{color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500"}}>
          Products
        </Link>
        <Link to="/contact" style={{color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500"}}>
          Contact
        </Link>
        <a href="https://www.facebook.com/TEXSPARES" target="_blank" rel="noreferrer" style={{color: "#3b82f6", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500"}}>
          Facebook
        </a>
        
        {!isAdmin ? (
          <Link to="/login" style={{backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", textDecoration: "none"}}>
            Login
          </Link>
        ) : (
          <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
            <Link to="/admin/dashboard" style={{color: "#F59E0B", textDecoration: "none", fontSize: "0.95rem", fontWeight: "700"}}>
              Admin Panel
            </Link>
            <button onClick={handleLogout} style={{backgroundColor: "#EF4444", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600"}}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
