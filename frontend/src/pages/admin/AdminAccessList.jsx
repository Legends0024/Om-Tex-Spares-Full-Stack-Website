import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const AdminAccessList = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });

  const fetchEntries = async () => {
    try {
      const res = await axios.get('/access');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/access', formData);
      setFormData({ name: '', phone: '', note: '' });
      fetchEntries();
    } catch (err) {
      alert("Error adding entry");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this access entry?")) {
      try {
        await axios.delete(`/access/${id}`);
        fetchEntries();
      } catch (err) {
        alert("Error deleting entry");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Access List Directory</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border mb-8">
        <h2 className="text-lg font-bold mb-4">Add Person to Directory</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded focus:ring-accent" />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-1">Phone Number <span className="text-xs text-gray-400">(with country code)</span></label>
            <input required type="text" name="phone" placeholder="e.g. 919999999999" value={formData.phone} onChange={handleChange} className="w-full border-gray-300 rounded focus:ring-accent" />
          </div>
          <div className="w-full md:w-2/4">
            <label className="block text-sm font-medium mb-1">Note (Optional)</label>
            <input type="text" name="note" value={formData.note} onChange={handleChange} className="w-full border-gray-300 rounded focus:ring-accent" />
          </div>
          <button type="submit" className="bg-navy text-white px-6 py-2 rounded font-bold hover:bg-gray-800 h-[42px] whitespace-nowrap">
            Add Person
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone & WhatsApp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Note</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date Added</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map(e => (
              <tr key={e.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {e.phone}
                  <div className="mt-1">
                    <a href={e.whatsapp_link} target="_blank" rel="noreferrer" className="text-whatsapp hover:underline text-xs font-bold">
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.note || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(e.granted_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No access entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAccessList;
