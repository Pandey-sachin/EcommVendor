import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  if (!product) return null;
  
  const discountedPrice = product.price * (1 - product.discount / 100);
  const isOutOfStock = product.quantity <= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.images?.[0] || "/api/placeholder/300/300"}
          alt={product.pname}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/300";
          }}
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm">
            {product.discount}% OFF
          </div>
        )}
        <button 
          className="absolute top-2 left-2 p-1.5 bg-white rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 truncate">{product.pname}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
            )}
          </div>
          <button 
            className={`p-2 rounded-full transition-colors ${
              isOutOfStock 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            disabled={isOutOfStock}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        <p className={`text-sm mt-2 ${
          isOutOfStock ? 'text-red-600' : 'text-green-600'
        }`}>
          {isOutOfStock ? 'Out of stock' : `${product.quantity} in stock`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;