import { configureStore } from "@reduxjs/toolkit";
import auth from './features/authSlice.js'
import brand from './features/brandSlice.js'
export const store = configureStore({
    reducer:{
    Auth:auth,
    Brand:brand
    }

})