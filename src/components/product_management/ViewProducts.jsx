import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../reducers/productSlice'; 
import LoadingSpinner from '../Loading';
import ErrorDisplay from '../Error';
const ViewProducts = () => {
  
  const products = useSelector(selectAllProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  if (isLoading) {
    return <LoadingSpinner/>;
  }
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold text-red-800 mb-6">All Products</h1>
        <p className="text-center text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    
      <div className='overflow-y-auto max-h-[550px] shadow-lg'>
        <table className="min-w-full table-auto">
          <thead className="bg-red-100">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Discount</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.pname} 
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg'; 
                    }}
                  />
                </td>
                <td className="py-3 px-4">{product.pname}</td>
                <td className="py-3 px-4">
                  {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}₹
                </td>
                <td className="py-3 px-4">{product.quantity}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.discount ?? 0}%</td>
                <td className="py-3 px-4">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default ViewProducts;