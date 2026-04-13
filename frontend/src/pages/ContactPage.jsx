import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [config, setConfig] = useState({ admin_whatsapp: "918222085999" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    phone: '',
    email: '',
    message: '',
    prefers_whatsapp: false,
    product_no: ''
  });

  useEffect(() => {
    axios.get('/config').then(res => setConfig(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/enquiries', formData);
      setSuccess(true);
      setFormData({ name: '', company_name: '', phone: '', email: '', message: '', prefers_whatsapp: false, product_no: '' });
    } catch (error) {
      alert("Error submitting enquiry");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Contact <span className="text-brandOrange">Us</span></h1>
        <p className="text-gray-600 mb-10 text-lg">Send us your requirements or queries, and we will get back to you promptly.</p>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10">
          {success ? (
            <div className="bg-green-50 border border-green-100 text-green-800 p-8 rounded-2xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 className="text-2xl font-black mb-2">Thank You!</h2>
              <p className="text-green-700">Your enquiry has been submitted successfully. We will reach out to you soon.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Company Name *</label>
                  <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number *</label>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Number (Optional)</label>
                <input type="text" name="product_no" placeholder="e.g. 12" value={formData.product_no} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message *</label>
                <textarea required rows="5" name="message" value={formData.message} onChange={handleChange} className="w-full border-gray-200 rounded-xl py-3 px-4 focus:border-brandOrange focus:ring-brandOrange transition-all"></textarea>
              </div>
              
              <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input 
                  type="checkbox" 
                  id="prefers_whatsapp"
                  name="prefers_whatsapp"
                  checked={formData.prefers_whatsapp}
                  onChange={handleChange}
                  className="h-5 w-5 text-brandOrange focus:ring-brandOrange border-gray-300 rounded-lg cursor-pointer"
                />
                <label htmlFor="prefers_whatsapp" className="ml-3 block text-sm font-bold text-gray-600 cursor-pointer">
                  Prefer WhatsApp contact over phone call
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-brandOrange text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-brandOrange/20 hover:bg-orange-600 transition-all disabled:opacity-70 transform active:scale-95"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="text-center bg-whatsapp/5 p-10 rounded-2xl border border-whatsapp/10">
          <p className="text-gray-700 font-bold mb-6">Or reach out directly via WhatsApp for immediate assistance:</p>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-whatsapp text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-whatsapp/20 hover:bg-green-600 transition-all transform hover:-translate-y-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3.5l-1 4.5z"></path></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
