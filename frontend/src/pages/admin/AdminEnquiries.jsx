import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get('/enquiries');
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleMarkResponded = async (id) => {
    try {
      await axios.put(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this enquiry permanently?')) {
      try {
        await axios.delete(`/enquiries/${id}`);
        fetchEnquiries();
      } catch (err) {
        alert("Error deleting enquiry");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Customer Enquiries</h1>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer details</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiries.map(e => (
              <tr key={e.id} className={e.status === 'new' ? 'bg-red-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(e.created_at).toLocaleDateString()}<br/>
                  <span className="text-xs">{new Date(e.created_at).toLocaleTimeString()}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-bold">{e.name}</div>
                  <div className="text-gray-500">{e.company_name}</div>
                  <div className="mt-1">
                    <a href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-whatsapp font-medium hover:underline block">
                      📞 {e.phone} {e.prefers_whatsapp && '(Prefers WA)'}
                    </a>
                  </div>
                  <div className="text-sm">{e.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words whitespace-pre-wrap">
                  {e.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold uppercase ${
                    e.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {e.status === 'new' && (
                    <button onClick={() => handleMarkResponded(e.id)} className="text-accent hover:underline bg-blue-50 px-2 py-1 rounded">
                      Mark Responded
                    </button>
                  )}
                  <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEnquiries;
