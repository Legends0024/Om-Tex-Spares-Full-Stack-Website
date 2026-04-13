import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const emptyProduct = {
  name: '', brand: 'GENERAL', category: '', part_number: '', description: '', is_featured: false, image_url: '', product_no: ''
};

const brands_list = ["SOMET", "VAMATEX", "SULZER", "BONAS", "STAUBLI", "GENERAL"];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data || []);
      const enq = await axios.get('/enquiries');
      setEnquiriesCount(enq.data ? enq.data.length : 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle number correctly
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'product_no' && val ? parseInt(val, 10) : val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/products/${editingId}`, formData);
      } else {
        await axios.post('/products', formData);
      }
      setFormData(emptyProduct);
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setFormData({
      name: p.name, brand: p.brand, category: p.category, part_number: p.part_number,
      description: p.description, is_featured: p.is_featured, image_url: p.image_url, product_no: p.product_no || ''
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const featuredCount = products.filter(p => p.is_featured).length;
  const uniqueBrands = new Set(products.map(p => p.brand)).size;

  return (
    <div style={{fontFamily: "system-ui, sans-serif"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: "2rem"}}>
        <h1 style={{fontSize: "2rem", fontWeight: "700", color: "#0A1628"}}>Product Inventory</h1>
        <button 
          onClick={() => { setShowForm(!showForm); setFormData(emptyProduct); setEditingId(null); }}
          style={{backgroundColor: "#0A1628", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", border: "none", cursor: "pointer"}}
        >
          {showForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {/* SALES OVERVIEW STRIP */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem", marginBottom:"2rem", marginTop:"1.5rem"}}>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center", boxShadow:"0 2px 4px rgba(0,0,0,0.02)"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{products.length}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Total Products</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center", boxShadow:"0 2px 4px rgba(0,0,0,0.02)"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{featuredCount}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Featured Products</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center", boxShadow:"0 2px 4px rgba(0,0,0,0.02)"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{uniqueBrands}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Brands Listed</div>
        </div>
        <div style={{backgroundColor:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"1.5rem", textAlign:"center", boxShadow:"0 2px 4px rgba(0,0,0,0.02)"}}>
          <div style={{fontSize:"2.5rem", fontWeight:"800", color:"#0A1628"}}>{enquiriesCount}</div>
          <div style={{fontSize:"0.85rem", color:"#64748b", marginTop:"0.25rem"}}>Total Enquiries</div>
        </div>
      </div>

      {showForm && (
        <div style={{backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "2rem"}}>
          <h2 style={{fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem"}}>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
            <input required type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}} />
            <input type="number" name="product_no" placeholder="Product No (e.g. 1)" value={formData.product_no} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}} />
            <select name="brand" value={formData.brand} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}}>
              {brands_list.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <input required type="text" name="part_number" placeholder="Part Number" value={formData.part_number} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}} />
            <input required type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}} />
            <input type="text" name="image_url" placeholder="Image URL (e.g. /images/products/1.png)" value={formData.image_url} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}} />
            <textarea required rows="3" name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={{padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1"}}></textarea>
            <label style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
              <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
              Display as Featured Product
            </label>
            <button type="submit" style={{backgroundColor: "#2563EB", color: "#fff", padding: "10px", borderRadius: "8px", fontWeight: "600", border: "none", cursor: "pointer"}}>
              {editingId ? 'Update Product' : 'Save Product'}
            </button>
          </form>
        </div>
      )}

      <div style={{backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden"}}>
        <table style={{width: "100%", borderCollapse: "collapse", textAlign: "left"}}>
          <thead style={{backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0"}}>
            <tr>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Product No</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Part No</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Name</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Brand</th>
              <th style={{padding: "12px 16px", fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{borderBottom: "1px solid #F1F5F9"}}>
                <td style={{padding: "16px", fontSize: "0.9rem", color: "#64748b", fontWeight: "bold"}}>{p.product_no || '-'}</td>
                <td style={{padding: "16px", fontSize: "0.9rem", color: "#64748b", fontFamily: "monospace"}}>{p.part_number}</td>
                <td style={{padding: "16px", fontSize: "0.95rem", fontWeight: "600"}}>
                  {p.image_url && <img src={p.image_url} alt="img" style={{width: "30px", height: "30px", objectFit: "cover", marginRight: "10px", verticalAlign: "middle", borderRadius: "4px"}}/>}
                  {p.name} {p.is_featured && '⭐'}
                </td>
                <td style={{padding: "16px", fontSize: "0.85rem", fontWeight: "700", color: "#0A1628"}}>{p.brand}</td>
                <td style={{padding: "16px"}}>
                  <button onClick={() => handleEdit(p)} style={{color: "#2563EB", background: "none", border: "none", cursor: "pointer", marginRight: "10px", fontWeight: "600"}}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={{color: "#EF4444", background: "none", border: "none", cursor: "pointer", fontWeight: "600"}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
