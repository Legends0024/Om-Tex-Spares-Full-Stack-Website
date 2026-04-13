import { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutGrid, Users, UserPlus, Briefcase, BarChart3, Settings, 
  Package, MessageCircle, Shield, Search, Bell, HelpCircle, Plus, LogOut 
} from 'lucide-react';

const AdminLayout = () => {
  const { fullName, logout, isSuperAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    padding: "10px 12px", 
    borderRadius: "10px", 
    color: isActive ? "#fff" : "#8892A4", 
    backgroundColor: isActive ? "rgba(244, 129, 31, 0.15)" : "transparent",
    textDecoration: "none", 
    fontSize: "0.9rem", 
    marginBottom: "2px",
    fontWeight: isActive ? "600" : "500"
  });

  const sectionLabel = {
    color: "#8892A4", 
    fontSize: "10px", 
    fontWeight: "700", 
    letterSpacing: "0.1em", 
    margin: "1.5rem 0 0.5rem 0.75rem",
    textTransform: "uppercase"
  };

  const initials = fullName ? fullName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : "AD";

  return (
    <div style={{display: "flex", minHeight: "100vh", backgroundColor: "#0A1628", fontFamily: "'Inter', sans-serif"}}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: "240px", 
        minHeight: "100vh", 
        backgroundColor: "#0A1628", 
        borderRight: "1px solid rgba(255,255,255,0.06)", 
        display: "flex", 
        flexDirection: "column", 
        padding: "1.5rem 1rem", 
        position: "fixed", 
        top: 0, 
        left: 0
      }}>
        <div style={{paddingLeft: "0.75rem", marginBottom: "2rem"}}>
          <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px"}}>
            <div style={{backgroundColor: "#F4811F", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "0.8rem"}}>OTS</div>
            <div style={{color:"#fff", fontWeight:"900", fontSize:"0.9rem", letterSpacing:"0.05em"}}>OM TEX SPARES</div>
          </div>
          <div style={{color:"#F4811F", fontSize:"0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em"}}>Admin Panel</div>
        </div>
        
        <div style={sectionLabel}>Main</div>
        <NavLink to="/admin/dashboard" style={navLinkStyle} end><LayoutGrid size={18}/>Dashboard</NavLink>
        <NavLink to="/admin/customers" style={navLinkStyle}><Users size={18}/>Customers</NavLink>
        <NavLink to="/admin/leads" style={navLinkStyle}><UserPlus size={18}/>Leads</NavLink>
        <NavLink to="/admin/deals" style={navLinkStyle}><Briefcase size={18}/>Deals</NavLink>
        <NavLink to="/admin/reports" style={navLinkStyle}><BarChart3 size={18}/>Reports</NavLink>
        
        <div style={sectionLabel}>Products</div>
        <NavLink to="/admin/products" style={navLinkStyle}><Package size={18}/>Products</NavLink>
        <NavLink to="/admin/enquiries" style={navLinkStyle}><MessageCircle size={18}/>Enquiries</NavLink>
        <NavLink to="/admin/access" style={navLinkStyle}><Shield size={18}/>Access List</NavLink>

        <div style={sectionLabel}>System</div>
        {isSuperAdmin && <NavLink to="/admin/users" style={navLinkStyle}><Users size={18}/>Admin Users</NavLink>}
        <NavLink to="/admin/settings" style={navLinkStyle}><Settings size={18}/>Settings</NavLink>

        <button style={{
          backgroundColor: "rgba(244, 129, 31, 0.1)", 
          color: "#F4811F", 
          border: "1px solid rgba(244, 129, 31, 0.2)", 
          borderRadius: "10px", 
          padding: "10px 16px", 
          cursor: "pointer", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          width: "100%", 
          marginTop: "auto", 
          fontWeight: "700",
          fontSize: "0.85rem"
        }}>
          <Plus size={18}/> New Record
        </button>
      </aside>

      {/* TOP BAR */}
      <header style={{
        position: "fixed", 
        top: 0, 
        left: "240px", 
        right: 0, 
        height: "64px", 
        backgroundColor: "#0A1628", 
        borderBottom: "1px solid rgba(255,255,255,0.06)", 
        display: "flex", 
        alignItems: "center", 
        padding: "0 2rem", 
        gap: "1.5rem", 
        zIndex: 100
      }}>
        <div style={{flex: 1, position: "relative"}}>
          <Search size={18} style={{position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8892A4"}}/>
          <input 
            type="text" 
            placeholder="Search insights, clients, or analytics..." 
            style={{
              width: "100%", 
              backgroundColor: "rgba(255,255,255,0.04)", 
              border: "1px solid rgba(255,255,255,0.08)", 
              borderRadius: "10px", 
              padding: "8px 16px 8px 40px", 
              color: "#fff", 
              fontSize: "0.9rem",
              outline: "none"
            }}
          />
        </div>
        
        <Bell size={20} style={{color: "#8892A4", cursor: "pointer"}}/>
        <HelpCircle size={20} style={{color: "#8892A4", cursor: "pointer"}}/>
        
        <div style={{display: "flex", alignItems: "center", gap: "10px", paddingLeft: "1rem", borderLeft: "1px solid rgba(255,255,255,0.06)"}}>
          <div style={{textAlign: "right", display: "none", md: "block"}}>
            <div style={{color: "#fff", fontSize: "0.85rem", fontWeight: "600"}}>{fullName}</div>
          </div>
          <div style={{
            width: "36px", 
            height: "36px", 
            borderRadius: "50%", 
            backgroundColor: "rgba(244, 129, 31, 0.2)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "#F4811F", 
            fontWeight: "900", 
            fontSize: "0.85rem",
            cursor: "pointer"
          }} onClick={handleLogout} title="Logout">
            {initials}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{
        marginLeft: "240px", 
        marginTop: "64px", 
        padding: "2rem", 
        minHeight: "calc(100vh - 64px)",
        width: "calc(100% - 240px)",
        boxSizing: "border-box"
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
