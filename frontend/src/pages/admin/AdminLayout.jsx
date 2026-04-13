import { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#fff" : "#94a3b8",
    backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "4px",
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "background-color 0.2s"
  });

  return (
    <div style={{display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, sans-serif"}}>
      {/* Sidebar */}
      <aside style={{width:"240px", backgroundColor:"#0A1628", minHeight:"100vh", padding:"2rem 1rem", display:"flex", flexDirection:"column"}}>
        <div style={{color:"#fff", fontWeight:"800", fontSize:"1.1rem", marginBottom:"2rem", paddingLeft:"0.75rem"}}>
          OM TEX SPARES
        </div>
        
        <nav style={{display: "flex", flexDirection: "column"}}>
          <NavLink to="/admin/dashboard" style={navLinkStyle} end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" style={navLinkStyle}>
            Products
          </NavLink>
          <NavLink to="/admin/enquiries" style={navLinkStyle}>
            Enquiries
          </NavLink>
          <NavLink to="/admin/access" style={navLinkStyle}>
            Access List
          </NavLink>
          <NavLink to="/admin/settings" style={navLinkStyle}>
            Settings
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout}
          style={{marginTop:"auto", backgroundColor:"#EF4444", color:"#fff", border:"none", padding:"10px 12px", borderRadius:"8px", cursor:"pointer", width:"100%", textAlign:"left", fontWeight: "600", fontSize: "0.95rem"}}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{flex: 1, padding: "2rem", overflowY: "auto"}}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
