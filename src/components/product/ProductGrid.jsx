import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, activeCategory = 'All' }) => {
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeCategory === 'All' ? 'All Products' : activeCategory}
        </h2>
        <p className="text-gray-600">
          Showing {filteredProducts.length} products
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;