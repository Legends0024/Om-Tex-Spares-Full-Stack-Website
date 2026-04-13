import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({ admin_whatsapp: "918222085999" });

  useEffect(() => {
    // We just ignore the error so frontend remains unbroken if backend is down
    axios.get('/config').then(res => setConfig(res.data)).catch(() => {});
    axios.get('/products/featured')
      .then(res => {
        setFeaturedProducts(res.data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{fontFamily: "system-ui, -apple-system, sans-serif", margin: 0, padding: 0}}>
      <Navbar />

      {/* SECTION 1 - HERO */}
      <section style={{
        minHeight:"90vh", 
        background:"linear-gradient(135deg, #F4811F 0%, #d97706 100%)", 
        display:"flex", 
        flexDirection:"column", 
        justifyContent:"center", 
        alignItems:"center", 
        textAlign:"center", 
        padding:"4rem 2rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle decorative circle */}
        <div style={{position:"absolute", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(255,255,255,0.1)", zIndex: 0}}></div>
        
        <div style={{backgroundColor:"#ffffff", color:"#F4811F", padding:"6px 20px", borderRadius:"999px", fontSize:"13px", fontWeight:"700", marginBottom:"2rem", display:"inline-block", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative", zIndex: 1}}>
          OM TEX SPARES • OTS
        </div>
        <h1 style={{fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:"900", color:"#ffffff", lineHeight:"1", marginBottom:"1.5rem", maxWidth:"900px", textShadow: "0 2px 10px rgba(0,0,0,0.1)", position: "relative", zIndex: 1}}>
          Premium Textile Machinery & Spare Parts
        </h1>
        <p style={{fontSize:"1.25rem", color:"rgba(255,255,255,0.9)", marginBottom:"3rem", maxWidth:"700px", fontWeight: "500", position: "relative", zIndex: 1}}>
          Trusted importer and dealer specializing in SOMET, VAMATEX, SULZER, BONAS & STAUBLI. Delivering excellence to your weaving floor.
        </p>
        <div style={{display:"flex", gap:"1.5rem", flexWrap:"wrap", justifyContent:"center", position: "relative", zIndex: 1}}>
          <Link to="/products" style={{backgroundColor:"#ffffff", color:"#F4811F", padding:"16px 40px", borderRadius:"12px", fontSize:"1.1rem", fontWeight:"700", border:"none", cursor:"pointer", textDecoration:"none", boxShadow: "0 10px 20px rgba(0,0,0,0.15)"}}>
            Browse Catalog
          </Link>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" style={{backgroundColor:"#25D366", color:"#fff", padding:"16px 40px", borderRadius:"12px", fontSize:"1.1rem", fontWeight:"700", border:"none", cursor:"pointer", textDecoration:"none", boxShadow: "0 10px 20px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "8px"}}>
            WhatsApp Enquiry
          </a>
        </div>
      </section>

      {/* SECTION 2 - BRANDS */}
      <section style={{backgroundColor:"#ffffff", padding:"6rem 2rem"}}>
        <div style={{textAlign:"center", marginBottom:"4rem"}}>
          <h2 style={{fontSize:"2.5rem", fontWeight:"800", color:"#111827", marginBottom:"1rem"}}>
            Leading Brands We Support
          </h2>
          <div style={{width:"80px", height:"4px", backgroundColor:"#F4811F", margin:"0 auto"}}></div>
        </div>
        <div style={{display:"flex", flexWrap:"wrap", gap:"2rem", justifyContent:"center", maxWidth:"1200px", margin: "0 auto"}}>
          {[
            { name: 'SOMET', desc: 'High-speed rapier looms', accent: "#F4811F"},
            { name: 'VAMATEX', desc: 'Precision rapier weaving', accent: "#F4811F"},
            { name: 'SULZER', desc: 'Projectile loom systems', accent: "#F4811F"},
            { name: 'BONAS', desc: 'Jacquard machinery', accent: "#F4811F"},
            { name: 'STAUBLI', desc: 'Dobby & shedding systems', accent: "#F4811F"}
          ].map(brand => (
            <div key={brand.name} style={{
              backgroundColor:"#fff", 
              border:"1px solid #f3f4f6", 
              borderRadius:"20px", 
              padding:"2.5rem 2rem", 
              minWidth:"200px", 
              flex: "1",
              textAlign:"center", 
              boxShadow:"0 4px 20px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease",
            }}>
              <div style={{color: brand.accent, fontSize:"1.5rem", fontWeight:"900", marginBottom:"1rem"}}>{brand.name}</div>
              <p style={{fontSize:"0.95rem", color:"#6b7280", margin: 0, fontWeight: "500"}}>{brand.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - FEATURED */}
      <section style={{backgroundColor:"#f9fafb", padding:"6rem 2rem"}}>
        <div style={{textAlign:"center", marginBottom:"4rem"}}>
          <h2 style={{fontSize:"2.5rem", fontWeight:"800", color:"#111827", marginBottom:"1rem"}}>
            Featured Inventory
          </h2>
          <p style={{color: "#6b7280", maxWidth: "600px", margin: "0 auto"}}>Explore our most popular and high-demand spare parts ready for immediate dispatch.</p>
        </div>
        
        {loading ? (
          <div style={{textAlign: "center", padding: "4rem", color: "#F4811F", fontWeight: "bold"}}>Loading products...</div>
        ) : (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:"2rem", maxWidth:"1200px", margin:"0 auto"}}>
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} adminWhatsapp={config.admin_whatsapp} />
            ))}
          </div>
        )}
        
        <Link to="/products" style={{
          display:"block", 
          margin:"4rem auto 0", 
          backgroundColor:"#111827", 
          color:"#fff", 
          padding:"16px 44px", 
          borderRadius:"12px", 
          fontSize:"1rem", 
          fontWeight:"700", 
          border:"none", 
          cursor:"pointer", 
          width:"fit-content", 
          textDecoration: "none",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }}>
          Explore All Products
        </Link>
      </section>

      {/* SECTION 4 - WHY CHOOSE US */}
      <section style={{backgroundColor:"#ffffff", padding:"6rem 2rem"}}>
        <div style={{display:"flex", flexWrap:"wrap", gap:"2rem", justifyContent:"center", maxWidth:"1200px", margin:"0 auto"}}>
          <div style={{flex:"1", minWidth:"280px", backgroundColor:"#fff", borderRadius:"24px", padding:"3rem 2rem", textAlign:"center", border:"1px solid #f3f4f6", boxShadow: "0 10px 30px rgba(0,0,0,0.02)"}}>
            <div style={{backgroundColor:"#fff7ed", borderRadius:"20px", width:"70px", height:"70px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F4811F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 style={{fontSize:"1.3rem", fontWeight:"800", color:"#111827", marginBottom:"1rem"}}>100% Genuine</h3>
            <p style={{fontSize:"1rem", color:"#6b7280", lineHeight: "1.6"}}>Every part is guaranteed for quality and performance on your machinery.</p>
          </div>
          
          <div style={{flex:"1", minWidth:"280px", backgroundColor:"#fff", borderRadius:"24px", padding:"3rem 2rem", textAlign:"center", border:"1px solid #f3f4f6", boxShadow: "0 10px 30px rgba(0,0,0,0.02)"}}>
            <div style={{backgroundColor:"#fff7ed", borderRadius:"20px", width:"70px", height:"70px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F4811F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 style={{fontSize:"1.3rem", fontWeight:"800", color:"#111827", marginBottom:"1rem"}}>Rapid Dispatch</h3>
            <p style={{fontSize:"1rem", color:"#6b7280", lineHeight: "1.6"}}>Pan-India shipping with quick fulfillment to keep your looms running.</p>
          </div>
          
          <div style={{flex:"1", minWidth:"280px", backgroundColor:"#fff", borderRadius:"24px", padding:"3rem 2rem", textAlign:"center", border:"1px solid #f3f4f6", boxShadow: "0 10px 30px rgba(0,0,0,0.02)"}}>
            <div style={{backgroundColor:"#fff7ed", borderRadius:"20px", width:"70px", height:"70px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F4811F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 style={{fontSize:"1.3rem", fontWeight:"800", color:"#111827", marginBottom:"1rem"}}>Expert Support</h3>
            <p style={{fontSize:"1rem", color:"#6b7280", lineHeight: "1.6"}}>Deep technical expertise to help you find the exact part you need.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CTA */}
      <section style={{backgroundColor:"#F4811F", padding:"6rem 2rem", textAlign:"center", position: "relative", overflow: "hidden"}}>
        <div style={{position:"absolute", bottom:"-50px", left:"-50px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.1)"}}></div>
        <h2 style={{fontSize:"2.2rem", fontWeight:"900", color:"#fff", marginBottom:"1.5rem", position: "relative", zIndex: 1}}>
          Can't find a specific spare part?
        </h2>
        <p style={{color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", marginBottom: "2.5rem", position: "relative", zIndex: 1}}>Send us a photo or part number, and we'll source it for you.</p>
        <div style={{display:"flex", gap:"1.5rem", flexWrap:"wrap", justifyContent:"center", position: "relative", zIndex: 1}}>
          <Link to="/products" style={{backgroundColor:"#111827", color:"#fff", padding:"16px 40px", borderRadius:"12px", fontSize:"1rem", fontWeight:"700", border:"none", cursor:"pointer", textDecoration:"none", boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}>
            View Products
          </Link>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" style={{backgroundColor:"#fff", color:"#F4811F", padding:"16px 40px", borderRadius:"12px", fontSize:"1rem", fontWeight:"700", border:"none", cursor:"pointer", textDecoration:"none", boxShadow: "0 10px 20px rgba(0,0,0,0.1)"}}>
            Inquire on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
