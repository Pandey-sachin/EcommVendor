import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: Cookies.get('jwtToken') || null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;    
            state.token = action.payload.token;  
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userData', JSON.stringify(action.payload.user));
        },
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;  
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            Cookies.remove('jwtToken');
        },
    },
});

export const { setUserDetails, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
