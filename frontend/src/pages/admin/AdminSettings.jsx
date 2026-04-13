import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const AdminSettings = () => {
  const [config, setConfig] = useState({
    admin_whatsapp: '',
    company_phone: '',
    company_email: '',
    company_address: ''
  });
  
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/config')
      .then(res => {
        if(res.data) {
          // Exclude internal id field for the form data if it leaks
          const { admin_whatsapp, company_phone, company_email, company_address } = res.data;
          setConfig({ admin_whatsapp, company_phone, company_email, company_address });
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await axios.put('/config', config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl text-left bg-white p-8 rounded-lg shadow border">
      <h1 className="text-2xl font-bold text-navy mb-6">Website Settings</h1>
      
      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded border border-green-200">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Company WhatsApp Number</label>
          <p className="text-xs text-gray-500 mb-2">Number for immediate contact, include country code without '+'. This updates all WhatsApp links on the site.</p>
          <input 
            type="text" 
            name="admin_whatsapp" 
            required
            value={config.admin_whatsapp} 
            onChange={handleChange} 
            className="w-full border-gray-300 rounded-lg focus:ring-accent" 
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Company Primary Phone</label>
          <p className="text-xs text-gray-500 mb-2">Displayed in the footer.</p>
          <input 
            type="text" 
            name="company_phone" 
            required
            value={config.company_phone} 
            onChange={handleChange} 
            className="w-full border-gray-300 rounded-lg focus:ring-accent" 
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Company Primary Email</label>
          <p className="text-xs text-gray-500 mb-2">Displayed in the footer.</p>
          <input 
            type="email" 
            name="company_email" 
            required
            value={config.company_email} 
            onChange={handleChange} 
            className="w-full border-gray-300 rounded-lg focus:ring-accent" 
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Company Address</label>
          <p className="text-xs text-gray-500 mb-2">Displayed in the footer.</p>
          <textarea 
            name="company_address" 
            rows="3"
            required
            value={config.company_address} 
            onChange={handleChange} 
            className="w-full border-gray-300 rounded-lg focus:ring-accent" 
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-accent text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-blue-700 disabled:opacity-70 transition"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
