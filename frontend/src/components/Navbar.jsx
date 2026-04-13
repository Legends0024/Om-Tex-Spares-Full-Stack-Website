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
      backgroundColor: "#ffffff", 
      padding: "0 2rem", 
      height: "70px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      position: "sticky", 
      top: 0, 
      zIndex: 1000,
      fontFamily: "system-ui, -apple-system, sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderBottom: "3px solid #F4811F"
    }}>
      <Link to="/" style={{display: "flex", alignItems: "center", gap: "10px", textDecoration: "none"}}>
        <div style={{
          backgroundColor: "#F4811F",
          color: "#fff",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "900",
          fontSize: "1.2rem",
          boxShadow: "0 2px 4px rgba(244,129,31,0.3)"
        }}>
          OTS
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <span style={{color: "#F4811F", fontWeight: "800", fontSize: "1.2rem", lineHeight: "1", letterSpacing: "0.02em"}}>
            OM TEX SPARES
          </span>
          <span style={{color: "#64748b", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em"}}>
            Textile Machinery & Spares
          </span>
        </div>
      </Link>
      
      <div style={{display: "flex", gap: "2rem", listStyle: "none", alignItems: "center"}}>
        <Link to="/products" style={{color: "#1e293b", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600"}}>
          Products
        </Link>
        <Link to="/contact" style={{color: "#1e293b", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600"}}>
          Contact
        </Link>
        <a href="https://www.facebook.com/TEXSPARES" target="_blank" rel="noreferrer" style={{color: "#1877F2", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600"}}>
          Facebook
        </a>
        
        {!isAdmin ? (
          <Link to="/login" style={{backgroundColor: "#F4811F", color: "#fff", border: "none", padding: "8px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", transition: "all 0.2s"}}>
            Login
          </Link>
        ) : (
          <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
            <Link to="/admin/dashboard" style={{color: "#F4811F", textDecoration: "none", fontSize: "0.95rem", fontWeight: "700"}}>
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
