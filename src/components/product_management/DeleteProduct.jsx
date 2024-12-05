import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectAllProducts, selectProductsLoading, selectProductsError,deleteProduct,deleteSelectedProduct,fetchProductsByVendor } from '../../reducers/productSlice'; 
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from '../Loading';
import ErrorDisplay from '../Error';
const DeleteProduct = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
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

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]); 
    } else {
      setSelectedProducts(products.map(product => product.productId)); 
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId)); 
    } else {
      setSelectedProducts([...selectedProducts, productId]); 
    }
  };

  const handleDelete = () => {
    if (selectedProducts.length > 0) {
      setIsModalOpen(true); 
    } else {
      toast.error('Please select products to delete');
    }
  };

  const confirmDelete = async () => { 
    if (!selectedProducts.length) {
      toast.error('No products selected for deletion.');
      return;
    }
  
    try {  
      if (selectedProducts.length === 1) {
         await dispatch(deleteProduct(selectedProducts[0]));
      } else {
         await dispatch(deleteSelectedProduct(selectedProducts));
      }
  
      await dispatch(fetchProductsByVendor(user.id)); 
      toast.success('Products deleted successfully!');
      setSelectedProducts([]); 
      setIsModalOpen(false); 
    } catch (err) {
      console.error('Error during deletion:', err); 
      toast.error(err.message || 'Failed to delete products. Please try again.');
    }
  };
  
  


  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={handleSelectAll}
        >
          {selectedProducts.length === products.length ? 'Deselect All' : 'Select All'}
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={handleDelete}
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-red-100">
              <th className="py-2">
                
              </th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-b">
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                  />
                </td>
                <td className="py-2 px-4">{product.pname}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">₹{product.price}</td>
                <td className="py-2 px-4">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Container */}
      <ToastContainer />

      {/* Custom Modal for Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-red-600 mb-6">
              Are you sure you want to delete the selected products?
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-200 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
