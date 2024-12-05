import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct,fetchProductsByVendor } from '../../reducers/productSlice';

import { ToastContainer, toast } from 'react-toastify';

const AddProduct = ({ mode = 'add', productId = null }) => {
  const dispatch = useDispatch();
  const editProduct = useSelector(state => 
   productId ? state.products.products.find(p => p.productId === productId) : null
  );
  
  const user = useSelector(state => state.auth.user);

  const [productData, setProductData] = useState({
    pname: '',
    price: '',
    category: '',
    description: '',
    images: [],
    quantity: '',
    discount: '',
    vendorId : user?.id
  });

  const [categories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home & Kitchen' },
    { id: 4, name: 'Books' },
    { id: 5, name: 'Toys' },
  ]);
  
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && editProduct) {
      setProductData({
        pname: editProduct.pname,
        price: editProduct.price,
        category: editProduct.category,
        description: editProduct.description || '',
        images: editProduct.images || [],
        quantity: editProduct.quantity,
        discount: editProduct.discount
      });
      if (editProduct.images && editProduct.images.length > 0) {
        setPreviewUrls(editProduct.images);
      }
    }
  }, [mode, editProduct]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url && !url.startsWith('data:') && !url.startsWith('http')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsImageLoading(true);
    setError('');

    try {
      const validFiles = files.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          setError(prev => prev + `${file.name} is larger than 5MB. `);
          return false;
        }
        if (!file.type.startsWith('image/')) {
          setError(prev => prev + `${file.name} is not a valid image file. `);
          return false;
        }
        return true;
      });

      const base64Promises = validFiles.map(convertToBase64);
      const base64Results = await Promise.all(base64Promises);

      setProductData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Results]
      }));

      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    } catch (err) {
      setError('Failed to process images');
    } finally {
      setIsImageLoading(false);
    }
  };

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    if (previewUrls[index] && !previewUrls[index].startsWith('data:') && !previewUrls[index].startsWith('http')) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!productData.pname.trim()) return 'Product name is required';
    if (parseFloat(productData.price) < 0) return 'Price cannot be negative';
    if (parseFloat(productData.quantity) < 0) return 'Quantity cannot be negative';
    if (productData.discount && (parseFloat(productData.discount) < 0 || parseFloat(productData.discount) > 100)) {
      return 'Discount must be between 0 and 100';
    }
    if (productData.images.length === 0) return 'At least one image is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      let word = "";
     if (mode === 'edit') {
        await dispatch(updateProduct(productId,{...productData,"vendorId": user.id}));
        word = "updated"
      } else {
        console.log(productData)
        await dispatch(addProduct(productData));
        word = "added"
      }
      await dispatch(fetchProductsByVendor(user.id)); 
      toast.success(`Product ${word} successfully!`);
    } catch (err) {
      setError(err.message || 'Failed to Add/Update product');
      toast.error(err.message || 'Failed to Add/Update product. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name and Category */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                name="pname"
                type="text"
                value={productData.pname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              placeholder="Enter product description..."
            />
          </div>

          {/* Price, Quantity, Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={productData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min="0"
                value={productData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                name="discount"
                type="number"
                min="0"
                max="100"
                value={productData.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full cursor-pointer text-sm sm:text-base"
              />
              {isImageLoading ? (
                <div className="mt-4 text-center text-gray-500">
                  Loading images...
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
            >
              {mode === 'edit' ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;