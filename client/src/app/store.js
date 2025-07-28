import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import otpModalReducer from '../features/otpModal/otpModalSlice'
import themeReducer from "../features/theme/themeSlice"


export const store = configureStore({
    reducer : {
        auth : authReducer,
        modal : otpModalReducer,
        theme : themeReducer
    }
})