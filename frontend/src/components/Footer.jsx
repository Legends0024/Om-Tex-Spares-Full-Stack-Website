import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Footer = () => {
  const [config, setConfig] = useState({
    admin_whatsapp: "918222085999",
    company_phone: "+91 82220 85999",
    company_email: "omtexspares@gmail.com",
    company_address: "17, New Subzi Mandi,\nNear GVM School,\nPANIPAT-132103"
  });

  useEffect(() => {
    axios.get('/config').then(res => setConfig(res.data)).catch(console.error);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6 border-t-4 border-brandOrange">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-brandOrange text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">OTS</div>
            <h3 className="text-white font-bold text-2xl tracking-tight">OM TEX SPARES</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Deals in: All Type of Textile Machinery & Spare Parts. 
            Trusted dealer ensuring high performance and durability for your weaving needs since years.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-brandOrange w-fit pb-1">Our Brands</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-brandOrange transition-colors">SOMET</li>
            <li className="hover:text-brandOrange transition-colors">VAMATEX</li>
            <li className="hover:text-brandOrange transition-colors">SULZER</li>
            <li className="hover:text-brandOrange transition-colors">BONAS</li>
            <li className="hover:text-brandOrange transition-colors">STAUBLI</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-brandOrange w-fit pb-1">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex flex-col">
              <span className="text-gray-500 text-xs font-semibold uppercase">Email</span>
              <a href={`mailto:${config.company_email}`} className="text-gray-300 hover:text-brandOrange">{config.company_email}</a>
            </li>
            <li className="flex flex-col">
              <span className="text-gray-500 text-xs font-semibold uppercase">Phone</span>
              <span className="text-gray-300">{config.company_phone}</span>
            </li>
            <li className="pt-2">
              <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-whatsapp/10 text-whatsapp px-4 py-2 rounded-lg border border-whatsapp/20 hover:bg-whatsapp hover:text-white transition-all text-xs font-bold">
                WHATSAPP US
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-brandOrange w-fit pb-1">Our Location</h4>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-300">
            {config.company_address}
          </p>
          <div className="mt-4">
             <a href="https://www.facebook.com/TEXSPARES" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <span className="text-xs font-bold">Follow us on Facebook</span>
             </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} <span className="text-brandOrange font-bold">Om Tex Spares</span>. All rights reserved.</p>
        <p className="mt-2 text-gray-600 italic text-[10px]">Proprietor: Sahil Sehgal</p>
      </div>
    </footer>
  );
};

export default Footer;
