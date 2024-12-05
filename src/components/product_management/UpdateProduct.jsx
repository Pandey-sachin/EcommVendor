import React,{ useState } from "react";
import { Pen } from "lucide-react";
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../reducers/productSlice'; 
import { useSelector } from "react-redux";
import LoadingSpinner from "../Loading";
import ErrorDisplay from "../Error";
import AddProduct from "./AddProduct";
const UpdateProduct = () => {
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  return (
    <div>
    {editingProductId ? (
      <AddProduct productId={editingProductId} mode={"edit"}/>
    
    ) :
    <div className="p-6">
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-red-100">
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-b">
                <td className="py-2 px-4">{product.pname}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">₹{product.price}</td>
                <td className="py-2 px-4">{product.quantity}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(product.productId)}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent border border-transparent rounded-md transition-all hover:border-red-300"
                  >
                    <Pen className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 hover:text-red-800">Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    }
    </div>
  );
};

export default UpdateProduct;
