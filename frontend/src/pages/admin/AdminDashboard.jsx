import { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserPlus, DollarSign, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { fullName } = useContext(AuthContext);
  const [data, setData] = useState({
    customers: [],
    leads: [],
    deals: [],
    stats: { total_value: 0, won_value: 0, deals_by_stage: {}, monthly_totals: [] },
    enquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [c, l, d, s, e] = await Promise.all([
          axios.get('/customers'),
          axios.get('/leads'),
          axios.get('/deals'),
          axios.get('/deals/stats'),
          axios.get('/enquiries')
        ]);
        setData({
          customers: c.data || [],
          leads: l.data || [],
          deals: d.data || [],
          stats: s.data || {},
          enquiries: e.data || []
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const cardStyle = {
    backgroundColor: "#161B27", 
    borderRadius: "16px", 
    border: "1px solid rgba(255,255,255,0.08)", 
    padding: "1.5rem"
  };

  const metricLabel = {
    color: "#8892A4", 
    fontSize: "11px", 
    fontWeight: "600", 
    letterSpacing: "0.08em", 
    textTransform: "uppercase", 
    marginTop: "1rem"
  };

  const metricValue = {
    color: "#fff", 
    fontSize: "2rem", 
    fontWeight: "800", 
    marginTop: "4px"
  };

  const PIE_COLORS = ["#F4811F", "#00D4AA", "#fbbf24", "#EF4444", "#fb923c"];
  const pieData = [
    { name: "SOMET", value: 35 },
    { name: "VAMATEX", value: 25 },
    { name: "SULZER", value: 20 },
    { name: "BONAS", value: 12 },
    { name: "STAUBLI", value: 8 }
  ];

  if (loading) return <div style={{color: "#fff"}}>Initializing CRM Experience...</div>;

  const activeLeads = data.leads.filter(l => l.status !== 'lost').length;
  const convRate = data.leads.length ? Math.round((data.leads.filter(l => l.status === 'qualified').length / data.leads.length) * 100) : 0;

  return (
    <div>
      {/* HEADER */}
      <div style={{marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
        <div>
          <h1 style={{color: "#fff", fontSize: "2rem", fontWeight: "700", margin: 0}}>Architect Overview</h1>
          <p style={{color: "#8892A4", marginTop: "4px"}}>Real-time performance metrics for your ecosystem.</p>
        </div>
        <div style={{display: "flex", gap:"10px"}}>
          <button style={{backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"}}>
            Create Deal
          </button>
          <button style={{backgroundColor: "#F4811F", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px"}}>
            Add Customer
          </button>
        </div>
      </div>

      {/* METRICS */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem"}}>
        <div style={cardStyle}>
          <Users size={24} color="#F4811F"/>
          <div style={metricLabel}>Total Customers</div>
          <div style={metricValue}>{data.customers.length}</div>
        </div>
        <div style={cardStyle}>
          <UserPlus size={24} color="#00D4AA"/>
          <div style={metricLabel}>Active Leads</div>
          <div style={metricValue}>{activeLeads}</div>
        </div>
        <div style={cardStyle}>
          <DollarSign size={24} color="#F4811F"/>
          <div style={metricLabel}>Revenue (Deals Won)</div>
          <div style={metricValue}>₹{(data.stats.won_value || 0).toLocaleString()}</div>
        </div>
        <div style={cardStyle}>
          <TrendingUp size={24} color="#EF4444"/>
          <div style={metricLabel}>Conversion Rate</div>
          <div style={metricValue}>{convRate}%</div>
        </div>
      </div>

      {/* CHARTS */}
      <div style={{display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "1.5rem", marginBottom: "2rem"}}>
        <div style={cardStyle}>
          <h3 style={{color: "#fff", fontSize: "1.1rem", marginBottom: "0.25rem"}}>Revenue Pulse</h3>
          <p style={{color: "#8892A4", fontSize: "0.85rem", marginBottom: "1.5rem"}}>Performance trend overview</p>
          <div style={{height: "220px", width: "100%"}}>
            <ResponsiveContainer>
              <AreaChart data={data.stats.monthly_totals}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F4811F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F4811F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#8892A4" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="#8892A4" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: "#161B27", border: "1px solid #F4811F", borderRadius: "8px", color: "#fff"}} />
                <Area type="monotone" dataKey="value" stroke="#F4811F" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{color: "#fff", fontSize: "1.1rem", marginBottom: "0.25rem"}}>Sales by Brand</h3>
          <p style={{color: "#8892A4", fontSize: "0.85rem", marginBottom: "1rem"}}>Market share</p>
          <div style={{height: "180px", position: "relative"}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={55} outerRadius={75} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}>
              <div style={{color: "#fff", fontSize: "0.8rem", fontWeight: "600"}}>Total</div>
              <div style={{color: "#fff", fontSize: "1rem", fontWeight: "800"}}>100%</div>
            </div>
          </div>
          <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "1rem"}}>
            {pieData.map((item, i) => (
              <div key={item.name} style={{display: "flex", alignItems: "center", gap: "5px", fontSize: "0.7rem", color: "#8892A4"}}>
                <div style={{width: "8px", height: "8px", borderRadius: "50%", backgroundColor: PIE_COLORS[i]}}></div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLES */}
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem"}}>
        <div style={cardStyle}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem"}}>
            <h3 style={{color: "#fff", fontSize: "1.1rem"}}>Recent Enquiries</h3>
            <Link to="/admin/enquiries" style={{color: "#F4811F", fontSize: "0.8rem", textDecoration: "none", fontWeight: "600"}}>View All</Link>
          </div>
          <table style={{width: "100%", borderCollapse: "collapse", color: "#fff", fontSize: "0.9rem"}}>
            <thead>
              <tr style={{borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "left"}}>
                <th style={{padding: "8px 0", color: "#8892A4", fontWeight: "600", fontSize: "0.8rem"}}>NAME</th>
                <th style={{padding: "8px 0", color: "#8892A4", fontWeight: "600", fontSize: "0.8rem"}}>PHONE</th>
                <th style={{padding: "8px 0", color: "#8892A4", fontWeight: "600", fontSize: "0.8rem"}}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.enquiries.slice(0, 5).map(e => (
                <tr key={e.id} style={{borderBottom: "1px solid rgba(255,255,255,0.04)"}}>
                  <td style={{padding: "12px 0", fontWeight: "500"}}>{e.name}</td>
                  <td style={{padding: "12px 0"}}>
                    <a href={`https://wa.me/${e.phone.replace(/\D/g,'')}`} target="_blank" style={{color: "#00D4AA", textDecoration: "none"}}>WA Link</a>
                  </td>
                  <td style={{padding: "12px 0"}}>
                    <span style={{fontSize: "0.75rem", backgroundColor: e.status === 'new' ? "rgba(244,129,31,0.1)" : "rgba(0,212,170,0.1)", color: e.status === 'new' ? "#F4811F" : "#00D4AA", padding: "2px 8px", borderRadius: "4px", fontWeight: "700"}}>{e.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={cardStyle}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem"}}>
            <h3 style={{color: "#fff", fontSize: "1.1rem"}}>Active Deals</h3>
            <Link to="/admin/deals" style={{color: "#F4811F", fontSize: "0.8rem", textDecoration: "none", fontWeight: "600"}}>View All</Link>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
             {data.deals.slice(0, 5).map(deal => (
               <div key={deal.id} style={{backgroundColor: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                 <div>
                   <div style={{color: "#fff", fontSize: "0.9rem", fontWeight: "600"}}>{deal.title}</div>
                   <div style={{color: "#8892A4", fontSize: "0.75rem"}}>{deal.customer_name}</div>
                 </div>
                 <div style={{textAlign: "right"}}>
                   <div style={{color: "#2563EB", fontSize: "0.95rem", fontWeight: "800"}}>₹{deal.value.toLocaleString()}</div>
                   <span style={{fontSize: "0.7rem", color: "#F59E0B", fontWeight: "700"}}>{deal.stage}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
