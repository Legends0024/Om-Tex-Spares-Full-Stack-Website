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
      <section style={{minHeight:"100vh", backgroundColor:"#0A1628", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding:"2rem"}}>
        <div style={{backgroundColor:"#F59E0B", color:"#000", padding:"4px 16px", borderRadius:"999px", fontSize:"12px", fontWeight:"600", marginBottom:"1.5rem", display:"inline-block"}}>
          OM TEX SPARES
        </div>
        <h1 style={{fontSize:"clamp(2rem,5vw,4rem)", fontWeight:"800", color:"#ffffff", lineHeight:"1.1", marginBottom:"1.5rem"}}>
          Premium Textile Machinery & Spare Parts
        </h1>
        <p style={{fontSize:"1.1rem", color:"#94a3b8", marginBottom:"2.5rem", maxWidth:"600px"}}>
          Trusted importer and dealer — SOMET • VAMATEX • SULZER • BONAS • STAUBLI
        </p>
        <div style={{display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center"}}>
          <Link to="/products" style={{backgroundColor:"#2563EB", color:"#fff", padding:"14px 32px", borderRadius:"8px", fontSize:"1rem", fontWeight:"600", border:"none", cursor:"pointer", textDecoration:"none"}}>
            Browse Products
          </Link>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" style={{backgroundColor:"#25D366", color:"#fff", padding:"14px 32px", borderRadius:"8px", fontSize:"1rem", fontWeight:"600", border:"none", cursor:"pointer", textDecoration:"none"}}>
            Enquire on WhatsApp
          </a>
        </div>
      </section>

      {/* SECTION 2 - BRANDS */}
      <section style={{backgroundColor:"#f8fafc", padding:"5rem 2rem"}}>
        <h2 style={{fontSize:"2rem", fontWeight:"700", color:"#0A1628", textAlign:"center", marginBottom:"3rem"}}>
          Our Brands
        </h2>
        <div style={{display:"flex", flexWrap:"wrap", gap:"1.5rem", justifyContent:"center"}}>
          {[
            { name: 'SOMET', desc: 'High-speed rapier looms'},
            { name: 'VAMATEX', desc: 'Precision rapier weaving'},
            { name: 'SULZER', desc: 'Projectile loom systems'},
            { name: 'BONAS', desc: 'Jacquard machinery'},
            { name: 'STAUBLI', desc: 'Dobby & shedding systems'}
          ].map(brand => (
            <div key={brand.name} style={{backgroundColor:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"2rem", minWidth:"180px", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontSize:"1.3rem", fontWeight:"700", color:"#0A1628", marginBottom:"0.5rem"}}>{brand.name}</h3>
              <p style={{fontSize:"0.9rem", color:"#64748b", margin: 0}}>{brand.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - FEATURED */}
      <section style={{backgroundColor:"#f1f5f9", padding:"5rem 2rem"}}>
        <h2 style={{fontSize:"2rem", fontWeight:"700", color:"#0A1628", textAlign:"center", marginBottom:"3rem"}}>
          Featured Products
        </h2>
        
        {loading ? (
          <div style={{textAlign: "center", padding: "3rem"}}>Loading...</div>
        ) : (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1.5rem", maxWidth:"1200px", margin:"0 auto"}}>
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} adminWhatsapp={config.admin_whatsapp} />
            ))}
          </div>
        )}
        
        <Link to="/products" style={{display:"block", margin:"3rem auto 0", backgroundColor:"#0A1628", color:"#fff", padding:"14px 32px", borderRadius:"8px", fontSize:"1rem", fontWeight:"600", border:"none", cursor:"pointer", width:"fit-content", textDecoration: "none"}}>
          View All Products
        </Link>
      </section>

      {/* SECTION 4 - WHY CHOOSE US */}
      <section style={{backgroundColor:"#fff", padding:"5rem 2rem"}}>
        <h2 style={{fontSize:"2rem", fontWeight:"700", color:"#0A1628", textAlign:"center", marginBottom:"3rem"}}>
          Why Choose Us?
        </h2>
        <div style={{display:"flex", flexWrap:"wrap", gap:"1.5rem", justifyContent:"center", maxWidth:"1200px", margin:"0 auto"}}>
          <div style={{flex:"1", minWidth:"220px", backgroundColor:"#f8fafc", borderRadius:"12px", padding:"2rem", textAlign:"center", border:"1px solid #e2e8f0"}}>
            <div style={{backgroundColor:"#EFF6FF", borderRadius:"50%", width:"56px", height:"56px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 style={{fontSize:"1.1rem", fontWeight:"700", color:"#0A1628", marginBottom:"0.5rem"}}>Genuine Parts</h3>
            <p style={{fontSize:"0.9rem", color:"#64748b", margin: 0}}>Guaranteed authenticity and high performance.</p>
          </div>
          
          <div style={{flex:"1", minWidth:"220px", backgroundColor:"#f8fafc", borderRadius:"12px", padding:"2rem", textAlign:"center", border:"1px solid #e2e8f0"}}>
            <div style={{backgroundColor:"#EFF6FF", borderRadius:"50%", width:"56px", height:"56px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <h3 style={{fontSize:"1.1rem", fontWeight:"700", color:"#0A1628", marginBottom:"0.5rem"}}>Fast Dispatch</h3>
            <p style={{fontSize:"0.9rem", color:"#64748b", margin: 0}}>Quick fulfillment reducing your machine downtime.</p>
          </div>
          
          <div style={{flex:"1", minWidth:"220px", backgroundColor:"#f8fafc", borderRadius:"12px", padding:"2rem", textAlign:"center", border:"1px solid #e2e8f0"}}>
            <div style={{backgroundColor:"#EFF6FF", borderRadius:"50%", width:"56px", height:"56px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 style={{fontSize:"1.1rem", fontWeight:"700", color:"#0A1628", marginBottom:"0.5rem"}}>Expert Support</h3>
            <p style={{fontSize:"0.9rem", color:"#64748b", margin: 0}}>Technical guidance for the right components.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CTA */}
      <section style={{backgroundColor:"#0A1628", padding:"5rem 2rem", textAlign:"center"}}>
        <h2 style={{fontSize:"1.8rem", fontWeight:"700", color:"#fff", marginBottom:"1rem"}}>
          Need a specific spare part? We'll find it for you.
        </h2>
        <div style={{display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center", marginTop:"2rem"}}>
          <Link to="/products" style={{backgroundColor:"#2563EB", color:"#fff", padding:"14px 32px", borderRadius:"8px", fontSize:"1rem", fontWeight:"600", border:"none", cursor:"pointer", textDecoration:"none"}}>
            Browse Products
          </Link>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" style={{backgroundColor:"#25D366", color:"#fff", padding:"14px 32px", borderRadius:"8px", fontSize:"1rem", fontWeight:"600", border:"none", cursor:"pointer", textDecoration:"none"}}>
            Enquire on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
