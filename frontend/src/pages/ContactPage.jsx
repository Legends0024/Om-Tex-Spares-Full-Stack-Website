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
        <h1 className="text-3xl font-bold text-navy mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">Send us your requirements or queries, and we will get back to you promptly.</p>
        
        <div className="bg-white rounded-lg shadow-md border p-6 md:p-10 mb-8">
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p>Your enquiry has been submitted successfully. We will reach out to you soon.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 bg-navy text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Number (Optional)</label>
                <input type="text" name="product_no" placeholder="e.g. 12" value={formData.product_no} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows="4" name="message" value={formData.message} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-accent focus:ring-accent"></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="prefers_whatsapp"
                  name="prefers_whatsapp"
                  checked={formData.prefers_whatsapp}
                  onChange={handleChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="prefers_whatsapp" className="ml-2 block text-sm text-gray-700">
                  Prefer WhatsApp contact over phone call
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-navy text-white py-3 rounded-lg font-bold shadow hover:bg-gray-800 transition disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">Or reach out directly via WhatsApp for immediate assistance:</p>
          <a href={`https://wa.me/${config.admin_whatsapp}`} target="_blank" rel="noreferrer" className="inline-block bg-whatsapp text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-green-600 transition">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
