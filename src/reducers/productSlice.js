import { createSlice } from '@reduxjs/toolkit';
import api from "../common/api"
const initialState = {
  products: [],
  loading: false,
  error: null,
  };

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch Products
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Product
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Product
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Product
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSelectedProductSuccess: (state, action) => {
      const idsToDelete = action.payload; 
      state.products = state.products.filter(product => !idsToDelete.includes(product.id));
      state.loading = false;
      state.error = null;
    },
  
  }
});

// Export actions
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  setCurrentProduct,
  clearCurrentProduct,
  deleteSelectedProductSuccess
} = productSlice.actions;


export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const token = localStorage.getItem('token');
    const response = await fetch(api.GetAllProducts.url, {
      method: api.GetAllProducts.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
    
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};



export const fetchProductsByVendor = (vendorId) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const token = localStorage.getItem('token');
    const response = await fetch(`${api.GetProductByVendor.url}/${vendorId}`, {
      method: api.GetProductByVendor.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    dispatch(addProductStart());
    const token = localStorage.getItem('token');
    const response = await fetch(api.AddProduct.url, {
      method: api.AddProduct.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to add product');
    const data = await response.json();
    dispatch(addProductSuccess(data));
    return data;
  } catch (error) {
    dispatch(addProductFailure(error.message));
    throw error;
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    // console.log(productData)
    dispatch(updateProductStart());
    const token = localStorage.getItem('token');
    const response = await fetch(`${api.UpdateProduct.url}/${productId}`, {
      method: api.UpdateProduct.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to update product');
    const data = await response.json();
    dispatch(updateProductSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateProductFailure(error.message));
    throw error;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    const token = localStorage.getItem('token');
    const response = await fetch(`${api.DeleteProduct.url}/${productId}`, {
      method: api.DeleteProduct.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    dispatch(deleteProductSuccess(productId));
    return true;
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
    throw error;
  }
};
export const deleteSelectedProduct = (productIds) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    const token = localStorage.getItem('token');
    const response = await fetch(`${api.DeleteALLProduct.url}`, {
      method: api.DeleteALLProduct.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productIds }),
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to delete products');
    dispatch(deleteSelectedProductSuccess(productIds));
    return true;
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
    throw error;
  }
};


// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export default productSlice.reducer;