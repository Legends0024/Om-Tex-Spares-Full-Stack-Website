import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Footer = () => {
  const [config, setConfig] = useState({
    admin_whatsapp: "918222085999",
    company_phone: "+91 99999 99999",
    company_email: "info@omtexspares.com",
    company_address: "Surat, Gujarat, India"
  });

  useEffect(() => {
    axios.get('/config').then(res => setConfig(res.data)).catch(console.error);
  }, []);

  return (
    <footer className="bg-navy text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-2xl mb-4">OM TEX SPARES</h3>
          <p className="text-sm">
            Trusted importer and dealer of premium textile machinery and spare parts. 
            Ensuring high performance and durability for your weaving needs.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Our Brands</h4>
          <ul className="space-y-2 text-sm">
            <li>SOMET</li>
            <li>VAMATEX</li>
            <li>SULZER</li>
            <li>BONAS</li>
            <li>STAUBLI</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: {config.company_email}</li>
            <li>Phone: {config.company_phone}</li>
            <li>
              <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" className="text-whatsapp hover:underline">
                WhatsApp Us
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/TEXSPARES" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                Follow us on Facebook
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Location</h4>
          <p className="text-sm whitespace-pre-line">
            {config.company_address}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-8 text-sm text-center">
        &copy; {new Date().getFullYear()} Om Tex Spares. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
