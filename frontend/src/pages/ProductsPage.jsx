import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import BrandFilter from '../components/BrandFilter';
import { Search } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [config, setConfig] = useState({ admin_whatsapp: "918222085999" });
  const [loading, setLoading] = useState(true);
  
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/config').then(res => setConfig(res.data)).catch(console.error);
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesBrand = selectedBrand === 'ALL' || p.brand === selectedBrand;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.part_number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Product <span className="text-brandOrange">Catalogue</span></h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <BrandFilter selected={selectedBrand} onChange={setSelectedBrand} />
            
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search name or part no..." 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brandOrange focus:border-brandOrange transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center gap-2 mb-8">
           <div className="bg-brandOrange/10 text-brandOrange px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              Live Inventory
           </div>
           <p className="text-gray-500 font-bold text-sm">
             Showing {filteredProducts.length} of {products.length} parts
           </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brandOrange"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} adminWhatsapp={config.admin_whatsapp} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-lg border">
                No products found matching your criteria. Try adjusting the search or filters.
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
