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
          <h1 className="text-3xl font-bold text-navy mb-6">Product Catalogue</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <BrandFilter selected={selectedBrand} onChange={setSelectedBrand} />
            
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search name or part no..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <p className="text-gray-600 mb-6 font-medium">
          Showing {filteredProducts.length} of {products.length} parts
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
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
