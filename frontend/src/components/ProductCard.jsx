import { useState } from 'react';

const ProductCard = ({ product, adminWhatsapp }) => {
  const [hovered, setHovered] = useState(false);
  
  const productNoDisplay = product.product_no ? `(Product No: ${product.product_no})` : '';
  const waText = encodeURIComponent(`Hi, I am interested in ${product.name} ${productNoDisplay} (Part No: ${product.part_number}) from Om Tex Spares.`);
  const waUrl = `https://wa.me/${adminWhatsapp}?text=${waText}`;

  const getBrandColors = (brand) => {
    switch(brand) {
      case 'SOMET': return { backgroundColor: "#DBEAFE", color: "#1D4ED8" };
      case 'VAMATEX': return { backgroundColor: "#EDE9FE", color: "#6D28D9" };
      case 'SULZER': return { backgroundColor: "#FEF3C7", color: "#D97706" };
      case 'BONAS': return { backgroundColor: "#D1FAE5", color: "#065F46" };
      case 'STAUBLI': return { backgroundColor: "#FEE2E2", color: "#991B1B" };
      default: return { backgroundColor: "#f1f5f9", color: "#475569" };
    }
  };

  const brandStyle = getBrandColors(product.brand);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#fff", 
        borderRadius: "12px", 
        border: "1px solid #e2e8f0", 
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)", 
        padding: "0", 
        display: "flex", 
        flexDirection: "column", 
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-4px)" : "none",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Product Image section */}
      <div style={{ height: "200px", width: "100%", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderBottom: "1px solid #e2e8f0" }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>No Image Available</span>
        )}
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flexGrow: "1" }}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
          <span style={{
            backgroundColor: brandStyle.backgroundColor, 
            color: brandStyle.color, 
            padding: "3px 10px", 
            borderRadius: "999px", 
            fontSize: "12px", 
            fontWeight: "600", 
            display: "inline-block"
          }}>
            {product.brand}
          </span>
          {product.is_featured && (
            <span style={{
              backgroundColor: "#FEF3C7", 
              color: "#92400E", 
              padding: "3px 10px", 
              borderRadius: "999px", 
              fontSize: "12px", 
              fontWeight: "600"
            }}>
              ⭐ Featured
            </span>
          )}
        </div>
        
        <h3 style={{fontSize: "1.1rem", fontWeight: "700", color: "#0A1628", margin: "0.5rem 0 0"}}>{product.name}</h3>
        
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {product.product_no && (
            <span style={{fontSize: "0.8rem", fontWeight: "bold", color: "#1e293b", backgroundColor: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", display: "inline-block"}}>
              No: {product.product_no}
            </span>
          )}
          <span style={{fontSize: "0.8rem", fontFamily: "monospace", color: "#64748b", backgroundColor: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", display: "inline-block"}}>
            PN: {product.part_number}
          </span>
        </div>
        
        <p style={{
          fontSize: "0.9rem", 
          color: "#475569", 
          lineHeight: "1.6", 
          display: "-webkit-box", 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: "vertical", 
          overflow: "hidden",
          margin: "0 0 1rem"
        }}>
          {product.description}
        </p>
        
        <a 
          href={waUrl} 
          target="_blank" 
          rel="noreferrer"
          style={{
            marginTop: "auto", 
            backgroundColor: "#25D366", 
            color: "#fff", 
            padding: "10px 20px", 
            borderRadius: "8px", 
            border: "none", 
            cursor: "pointer", 
            fontWeight: "600", 
            fontSize: "0.9rem", 
            width: "100%", 
            textDecoration: "none", 
            display: "block", 
            textAlign: "center",
            boxSizing: "border-box"
          }}
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
