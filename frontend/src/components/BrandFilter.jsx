const brands = ["ALL", "SOMET", "VAMATEX", "SULZER", "BONAS", "STAUBLI"];

const BrandFilter = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {brands.map(brand => (
        <button
          key={brand}
          onClick={() => onChange(brand)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            selected === brand 
              ? 'bg-navy text-white shadow' 
              : 'border border-navy text-navy hover:bg-gray-100'
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
