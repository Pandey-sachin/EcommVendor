import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'; 
import productReducer from './reducers/productSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,  
    },
});

export default store;
