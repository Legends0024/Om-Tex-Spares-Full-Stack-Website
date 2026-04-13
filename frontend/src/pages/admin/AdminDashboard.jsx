import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    totalEnquiries: 0,
    newEnquiries: 0
  });
  
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, enquiriesRes] = await Promise.all([
          axios.get('/products'),
          axios.get('/enquiries')
        ]);
        const products = productsRes.data || [];
        const enquiries = enquiriesRes.data || [];
        
        setMetrics({
          totalProducts: products.length,
          featuredProducts: products.filter(p => p.is_featured).length,
          totalEnquiries: enquiries.length,
          newEnquiries: enquiries.filter(e => e.status === 'new').length
        });
        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{fontFamily: "system-ui, sans-serif"}}>
      {/* WELCOME BANNER */}
      <div style={{backgroundColor:"#0A1628", borderRadius:"12px", padding:"2rem", marginBottom:"2rem", color:"#fff"}}>
        <h2 style={{fontSize: "1.8rem", margin: "0 0 0.5rem 0", fontWeight: "700"}}>Welcome back, Admin 👋</h2>
        <p style={{color:"#94a3b8", margin: 0, fontSize: "1rem"}}>Here's what's happening with Om Tex Spares today.</p>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem", marginBottom:"2rem"}}>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{metrics.totalProducts}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Total Products</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{metrics.featuredProducts}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Featured Products</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{metrics.totalEnquiries}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Total Enquiries</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center", borderLeft: metrics.newEnquiries > 0 ? "4px solid #EF4444" : ""}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#EF4444"}}>{metrics.newEnquiries}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>New Enquiries</div>
        </div>
      </div>

      <h2 style={{fontSize: "1.3rem", fontWeight: "700", color: "#0A1628", margin: "0 0 1rem 0"}}>Recent Enquiries</h2>
      <div style={{backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden"}}>
        <table style={{width: "100%", borderCollapse: "collapse", textAlign: "left"}}>
          <thead style={{backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0"}}>
            <tr>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Date</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Name</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Company</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Phone</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentEnquiries.map(e => (
              <tr key={e.id} style={{borderBottom: "1px solid #F1F5F9"}}>
                <td style={{padding: "16px", fontSize: "0.9rem", color: "#64748b"}}>{new Date(e.created_at).toLocaleDateString()}</td>
                <td style={{padding: "16px", fontSize: "0.95rem", fontWeight: "600"}}>{e.name}</td>
                <td style={{padding: "16px", fontSize: "0.9rem", color: "#64748b"}}>{e.company_name}</td>
                <td style={{padding: "16px"}}>
                  <a href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{color: "#25D366", textDecoration: "none", fontWeight: "600", fontSize: "0.9rem"}}>
                    {e.phone}
                  </a>
                </td>
                <td style={{padding: "16px"}}>
                  <span style={{
                    backgroundColor: e.status === 'new' ? "#DBEAFE" : "#D1FAE5", 
                    color: e.status === 'new' ? "#1D4ED8" : "#065F46", 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontSize: "0.75rem", 
                    fontWeight: "700", 
                    textTransform: "uppercase"
                  }}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
            {recentEnquiries.length === 0 && (
              <tr>
                <td colSpan="5" style={{padding: "2rem", textAlign: "center", color: "#64748b"}}>No recent enquiries.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
