import { configureStore } from "@reduxjs/toolkit";
import auth from './features/authSlice.js'
export const store = configureStore({
    reducer:{
    Auth:auth
    }

})